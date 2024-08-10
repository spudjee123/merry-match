import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import Footer from "./Footer";
import NavUser from "../pages/user-profile-management/navUser";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ดึง clientSecret จาก API
    const fetchClientSecret = async () => {
      try {
        const result = await axios.post('http://localhost:4001/payments/api/payment-intent', {
          user:  'John Doe' ,
          packageName: { name: 'Basic', price: 59 } 
        });
        setClientSecret(result.data.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
        setError('Failed to initialize payment.');
      }
    };

    fetchClientSecret();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);


    const { error, paymentIntent } = await stripe.confirmPayment({elements,confirmParams: {        return_url: `${window.location.origin}/success`,        
    payment_method_data: {billing_details: { name: fullName, }, },},     
    redirect: "if_required", }); 

    if (error) {
      console.error('Payment error:', error);
      setError(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded:', paymentIntent);
      // ทำสิ่งที่ต้องการหลังจากการชำระเงินสำเร็จ (เช่น การนำทางผู้ใช้ไปยังหน้าแสดงความสำเร็จ)
    } else {
      setError('Unexpected payment status.');
    }
    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element"  />
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
                  <div className="w-6 h-6 px-[2.25px] pt-[1.50px] pb-[1.82px] flex justify-center items-center" />
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
                      <div className="w-1 h-1 bg-slate-600 rounded-full" />
                      <div className="text-slate-600 text-base">
                        ‘Merry’ more than a daily limited
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pl-2">
                      <div className="w-1 h-1 bg-slate-600 rounded-full" />
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
                  <div className="flex justify-center items-center gap-3">
                    <div className="w-10 h-7 py-[9.33px] flex justify-center items-center" />
                    <div className="w-12 h-7 relative">
                      <div className="w-7 h-7 absolute bg-red-600 rounded-full" />
                      <div className="w-7 h-7 absolute left-[16px] bg-yellow-400/70 rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="h-[372px] px-6 py-8 flex flex-col gap-10 items-end">
                  <div className="w-full flex flex-col gap-1">
                    <div className="flex gap-1">
                      <div className="flex-grow text-base">
                        Card number <span className="text-pink-700">*</span>
                      </div>
                    </div>
                    <div className="w-full pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 flex items-start gap-2">
                      <div className="flex-grow text-slate-400 text-base">
                        Number of card
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <div className="flex gap-1">
                      <div className="flex-grow text-base">
                        Card owner <span className="text-pink-700">*</span>
                      </div>
                    </div>
                    <div className="w-full pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 flex items-start gap-2">
                      <div className="flex-grow text-slate-400 text-base">
                        Holder of card
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex gap-[22px]">
                    <div className="flex flex-col gap-1 flex-grow">
                      <div className="flex gap-1">
                        <div className="flex-grow text-base">
                          Expiry date <span className="text-pink-700">*</span>
                        </div>
                      </div>
                      <div className="w-full pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 flex items-start gap-2">
                        <div className="flex-grow text-slate-400 text-base">
                          MM/YY
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 flex-grow">
                      <div className="flex gap-1">
                        <div className="flex-grow text-base">
                          CVC/CVV <span className="text-pink-700">*</span>
                        </div>
                      </div>
                      <div className="w-full pl-3 pr-4 py-3 bg-white rounded-lg border border-gray-300 flex items-start gap-2">
                        <div className="flex-grow text-slate-400 text-base">
                          x x x
                        </div>
                      </div>
                    </div>
                  </div>
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

const Stripe = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe
