import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements, } from '@stripe/react-stripe-js';
import axios from 'axios';
import Footer from "./Footer";
import NavUser from "../pages/user-profile-management/navUser";
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

// Initialize Stripe with your public key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [paymentIntent, setPaymentIntent] = useState("")
  const { state } = useAuth();
  const userName = state.user?.username;
  const navigate = useNavigate()
  const location = useLocation()
  
  const { packageName, price, merryLimit, clientSecret, orderId} = location.state
console.log("location",location);
console.log("1",clientSecret);

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
      redirect: "if_required"
    });

    try {
      await axios.post('http://localhost:4001/payments/status', {
      "paymentIntentId": paymentIntent.id
    });
    } catch (error) {  
    alert("update error") 
    }
    if (error) {
      setError(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      setMessage('Payment succeeded!');
    } else {
      setError('Unexpected payment status.');
    }
    navigate(`/success`, {
      state: {
        packageName: packageName,
        price: price,
        merryLimit: merryLimit,
      },
    });
    setIsLoading(false);
  };

  // const paymentElementOptions = {
  //   layout: "tabs"
  // };
  const handleCancel = async (event) =>{
    event.preventDefault();
    try {
      await axios.delete('http://localhost:4001/payments/cancel',{userName: userName})
      navigate(`/membership`)
    } catch (error) {
      alert("cancel error")
    }
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <section className="flex flex-col min-h-screen">
        <nav className="w-full">
          <NavUser />
        </nav>
        <div className="w-screen">
          <div className="flex-grow flex justify-center items-center bg-white mt-[50px]">
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
                        {packageName}
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
                          Up to {merryLimit} Merry per day
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-baseline py-6">
                      <div className="text-slate-500 text-base">
                        Price (Monthly)
                      </div>
                      <div className="text-right text-stone-950 text-xl font-semibold">
                        {price}
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
                    <PaymentElement  />
                  </div>
                  <div className="w-full px-6 pt-6 pb-8 border-t border-gray-300 flex justify-between items-center">
                    <button onClick={handleCancel} className="px-2 py-1 rounded-2xl flex justify-center items-center gap-2 text-rose-700 text-base font-bold">
                        Cancel
                      </button>
                    </div>
                    <button className="px-6 py-3 bg-rose-700 rounded-[99px] shadow flex justify-center items-center gap-2 text-center text-white text-base font-bold" type="submit" >
                      {isLoading ? 'Processing...' : 'Payment Confirm'}
                    </button>
                    {error && <div id="payment-message" className="text-red-500">{error}</div>}
                    {message && <div id="payment-message" className="text-green-500">{message}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>   
        <Footer />
        </section>
    </form>
  );
};



export default CheckoutForm;
