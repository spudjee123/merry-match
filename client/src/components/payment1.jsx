import React from "react";
import NavUser from "../pages/user-profile-management/navUser.jsx";
import Footer from "./Footer.jsx";

const PayMentOne = () => {
  return (
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
                  <div className="px-6 py-3 bg-rose-700 rounded-[99px] shadow flex justify-center items-center gap-2">
                    <div className="text-center text-white text-base font-bold">
                      Payment Confirm
                    </div>
                  </div>
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
  );
};

export default PayMentOne;
