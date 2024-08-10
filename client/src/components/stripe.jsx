import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements, } from '@stripe/react-stripe-js';
import axios from 'axios';
import Footer from "./Footer";
import NavUser from "../pages/user-profile-management/navUser";


// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51PfZ62RwhwPMa1TWPdOpfAzf1QLKPwWMYmcLUuQ6Q3zwvT3c1OuhV7G573684JGsZC9Mm1sApO8LtcgFsOWdGYOf00POWiZaJZ');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch client secret from the backend
    axios.post('/create-payment-intent', { /* Your payment data */ })
      .then(response => {
        setClientSecret(response.data.clientSecret);
      })
      .catch(error => {
        setError('Failed to initialize payment.');
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    setError(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      setError(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      setMessage('Payment succeeded!');
      // Do something after payment success (e.g., redirect to a success page)
    } else {
      setError('Unexpected payment status.');
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <section className="flex flex-col min-h-screen">
        <nav className="w-full">
          <NavUser />
        </nav>

        <div className="w-full">
          <div className="flex-grow flex justify-center items-center bg-white mt-28">
            <div className="max-w-5xl w-full p-8 bg-white flex flex-col items-center">
              <div className="w-full flex gap-[22px]">
                <div className="w-full max-w-md px-6 py-8 bg-slate-50 rounded-3xl border border-gray-300 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="text-slate-500 text-xl font-semibold">
                      Merry Membership
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-baseline py-2">
                      <div className="text-slate-500 text-base">Package</div>
                      <div className="text-right text-slate-800 text-xl font-semibold">
                        Premium
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 px-2 py-2.5 bg-white rounded-lg">
                      <div className="flex items-center gap-2 pl-2">
                        <div className="text-slate-600 text-base">
                          ‘Merry’ more than a daily limited
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pl-2">
                        <div className="text-slate-600 text-base">
                          Up to 70 Merry per day
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-baseline py-6">
                      <div className="text-slate-500 text-base">
                        Price (Monthly)
                      </div>
                      <div className="text-right text-stone-950 text-xl font-semibold">
                        THB 149.00
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full max-w-lg bg-white rounded-3xl border border-gray-300">
                  <div className="w-full p-6 bg-slate-50 flex justify-between items-center">
                    <div className="text-gray-500 text-xl font-semibold">
                      Credit Card
                    </div>
                  </div>
                  <div className="h-[372px] px-6 py-8 flex flex-col gap-10 items-end">
                    <PaymentElement id="payment-element" options={paymentElementOptions} />
                  </div>
                  <div className="w-full px-6 pt-6 pb-8 border-t border-gray-300 flex justify-between items-center">
                    <div className="px-2 py-1 rounded-2xl flex justify-center items-center gap-2">
                      <div className="text-rose-700 text-base font-bold">
                        Cancel
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-rose-700 rounded-[99px] shadow flex justify-center items-center gap-2 text-center text-white text-base font-bold" type="submit" disabled={!stripe || !clientSecret || isLoading}>
                      {isLoading ? 'Processing...' : 'Payment Confirm'}
                    </button>
                    {error && <div id="payment-message" className="text-red-500">{error}</div>}
                    {message && <div id="payment-message" className="text-green-500">{message}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="w-full">
          <Footer />
        </footer>
      </section>
    </form>
  );
};

const App = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default App;
