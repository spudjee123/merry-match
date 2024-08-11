import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "./stripe.jsx"; // Assuming you have a CheckoutForm component




const Stripe = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  



  const stripePromise = loadStripe(
    "pk_test_51PfGepCsaxbmSm5Dug1DybzMHjBhWXevCXSlPcDrst0nGMSbNPb9lkUMFI2tgTqLpoXJwgHyqznryoN0xNpLkdt40000NTQoiw"
  );

  useEffect(() => {
    const fetchClientSecret = async () => {
      let result;
      
      try {
        result = await axios.post(
          "http://localhost:4001/payments/api/payment-intent",
          {
            user: "Ton Homland",
            packageName: { name: "Basic", price: 59 },
          }
        );
        console.log("result", result);
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

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  console.log("1", clientSecret);
  console.log("2", stripePromise);

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;
