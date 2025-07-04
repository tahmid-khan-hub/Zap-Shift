import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";
import useTrackingLogger from "../../hooks/useTrackingLogger";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const { user } = UseAuth();
  console.log(parcelId);
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const logTracking = useTrackingLogger();

  const [error, setError] = useState("");

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) return "...loading";

  console.log(parcelInfo);
  const amount = parcelInfo.cost;
  const amountInCents = amount * 100;
  console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (!card) return;

    // 1. validate card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) setError(error.message);
    else {
      setError("");
      console.log("payment -> ", paymentMethod);
    }

    // 2. payment intent (create)
    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      parcelId,
    });

    const clientSecret = res.data.clientSecret;

    // 3. confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    if (result.error) setError(result.error.message);
    else {
      setError("");
      if (result.paymentIntent.status === "succeeded") {
        console.log("payment succeed");
        console.log(result);

        // 4. mark parcel paid also create payment history
        const paymentData = {
          parcelId,
          email: user.email,
          amount,
          transactionId: result.paymentIntent.id,
        };

        const paymentResponse = await axiosSecure.post(
          "/payments",
          paymentData
        );

        if (paymentResponse.data.insertedId) {
          console.log("payment successful");
          await logTracking({
            trackingId: parcelInfo.tracking_id,
            status: "payment_successful",
            details: `Payment made by ${user.displayName}`,
            updated_by: user.email,
          });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "payment successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/myParcels");
        }
      }
    }

    console.log(res);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-lime-100 p-6 rounded-xl shafow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded"></CardElement>
        <button type="submit" disabled={!stripe} className="btn w-full ">
          Pay {amount}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
