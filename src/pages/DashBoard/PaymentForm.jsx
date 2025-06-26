import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const {parcelId} = useParams();
  console.log(parcelId);
  const axiosSecure = UseAxiosSecure()

  const [error, setError] = useState("");

  const {isPending, data: parcelInfo = {}} = useQuery({
    queryKey: ['parcels', parcelId],
    queryFn: async() =>{
      const res = await axiosSecure.get(`/parcels/${parcelId}`)
      return res.data;
    }
  })

  if(isPending) return "...loading"

  console.log(parcelInfo);
  const amount = parcelInfo.cost
  const amountInCents = amount*100;
  console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) setError(error.message);
    else {
      setError("");
      console.log("payment -> ", paymentMethod);
    }

    // payment intent (create)
    const res = await axiosSecure.post('/create-payment-intent', {
      amountInCents,
      parcelId
    })

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_methos: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: '',
        },
      },
    });

    if(result.error) console.log(result.error.message);
    else{
      if(result.paymentIntent.status === 'succeeded') console.log('payment succeed');
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
        {
            error && <p className="text-red-500">{error}</p>
        }
      </form>
    </div>
  );
};

export default PaymentForm;
