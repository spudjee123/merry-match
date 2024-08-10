import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm"; // Assuming you have a CheckoutForm component

const stripePromise = loadStripe(
  "pk_test_51PfZ62RwhwPMa1TWPdOpfAzf1QLKPwWMYmcLUuQ6Q3zwvT3c1OuhV7G573684JGsZC9Mm1sApO8LtcgFsOWdGYOf00POWiZaJZ"
);

const Stripe = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const result = await axios.post(
          "http://localhost:4001/payments/api/payment-intent",
          {
            user: "John Doe",
            packageName: { name: "Basic", price: 59 },
          }
        );
        console.log("asd"result);
        
        setClientSecret(result.data.clientSecret);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching client secret:", error);
        setError("Failed to initialize payment.");
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;
