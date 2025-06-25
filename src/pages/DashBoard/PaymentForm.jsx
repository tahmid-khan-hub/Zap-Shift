import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState("");

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
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-lime-100 p-6 rounded-xl shafow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded"></CardElement>
        <button type="submit" disabled={!stripe} className="btn w-full ">
          Pay For Parcel Pickup
        </button>
        {
            error && <p className="text-red-500">{error}</p>
        }
      </form>
    </div>
  );
};

export default PaymentForm;
