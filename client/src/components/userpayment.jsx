import React from "react";
import NavUser from "../pages/user-profile-management/navUser";

const Payment1Page = () => {
  return (
    <section className="w-full">
      <div className="">
        <NavUser />
      </div>

      <div className="w-full">
        <div className="w-full h-[1585px] pl-[254px] pr-[255px] pt-20 pb-28 bg-white flex-col justify-start items-center inline-flex mt-16">
          <div className="self-stretch flex-col justify-start items-center gap-20 inline-flex">
            <div className="w-full justify-start items-end gap-4 inline-flex">
              <div className="grow shrink basis-0 flex-col justify-start items-end gap-[37px] inline-flex">
                <div className="self-stretch h-[145px] flex-col justify-start items-start gap-2 flex">
                  <div className="self-stretch text-yellow-900 text-sm font-semibold  uppercase ">
                    Merry membership
                  </div>
                  <div className="self-stretch text-fuchsia-800 text-[46px] font-extrabold ">
                    Manage your membership
                    <br />
                    and payment method
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-col justify-start items-start gap-[60px] flex w-full">
              <div className="flex-col justify-start items-start gap-6 flex w-full">
                <div className="w-full text-slate-800 text-2xl font-bold ">
                  Merry Membership Package
                </div>
                <div className="h-[222px] w-full px-8 pt-8 pb-6 bg-gradient-to-br from-pink-900 to-pink-300 rounded-[32px] shadow flex-col justify-start items-end gap-4 flex">
                  <div className="self-stretch pb-10 border-b border-pink-400 justify-between items-start inline-flex">
                    <div className="justify-start items-center gap-6 flex">
                      <div className="w-[319px] self-stretch justify-start items-start gap-4 flex">
                        <div className="w-[78px] h-[78px] p-[21px] bg-slate-50 rounded-2xl justify-center items-center flex">
                          <div className="grow shrink basis-0 self-stretch px-[1.80px] pt-[1.81px] pb-[1.80px] justify-center items-center inline-flex" />
                        </div>
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                          <div className="self-stretch text-white text-[32px] font-bold ">
                            Premium
                          </div>
                          <div className="self-stretch justify-start items-baseline gap-1.5 inline-flex">
                            <div className="text-pink-200 text-xl font-semibold ">
                              THB 149.00
                            </div>
                            <div className="grow shrink basis-0 text-pink-200 text-base font-normal ">
                              /Month
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-[357px] self-stretch flex-col justify-center items-center gap-2 inline-flex">
                        <div className="self-stretch justify-start items-start gap-3 inline-flex">
                          <div className="w-6 h-6 p-[4.36px] justify-center items-center flex" />
                          <div className="grow shrink basis-0 text-pink-100 text-base font-normal ">
                            ‘Merry’ more than a daily limited
                          </div>
                        </div>
                        <div className="self-stretch justify-start items-start gap-3 inline-flex">
                          <div className="w-6 h-6 p-[4.36px] justify-center items-center flex" />
                          <div className="grow shrink basis-0 text-pink-100 text-base font-normal ">
                            Up to 50 Merry per day
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-1 bg-red-100 rounded-[99px] justify-center items-center gap-1 flex">
                      <div className="text-amber-700 text-base font-extrabold ">
                        Active
                      </div>
                    </button>
                  </div>
                  <button className="px-2 py-1 rounded-2xl justify-center items-center gap-2 inline-flex">
                    <div className="text-white text-base font-bold ">
                      Cancel Package
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-6 flex w-full">
                <div className=" text-slate-800 text-2xl font-bold ">
                  Payment Method
                </div>
                <div className="h-[194px] w-full px-8 pt-8 pb-6 bg-white rounded-[32px] border border-gray-300 flex-col justify-start items-end gap-4 flex">
                  <div className="self-stretch pb-6 border-b border-gray-200 justify-start items-center gap-6 inline-flex">
                    <div className="grow shrink basis-0 self-stretch justify-start items-start gap-4 flex">
                      <div className="w-[66px] h-[66px] p-[17px] bg-slate-50 rounded-2xl justify-center items-center flex">
                        <div className="grow shrink basis-0 self-stretch px-0.5 py-[5px] flex-col justify-center items-start gap-[3px] inline-flex" />
                      </div>
                      <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="self-stretch text-fuchsia-900 text-2xl font-bold ">
                          Visa ending *9899
                        </div>
                        <div className="self-stretch justify-start items-center gap-1.5 inline-flex">
                          <div className="text-slate-500 text-base font-normal ">
                            Expire 04/2025
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="px-2 py-1 rounded-2xl justify-center items-center gap-2 inline-flex">
                    <div className="text-rose-700 text-base font-bold ">
                      Edit Payment Method
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-6 flex w-full">
                <div className="w-full text-slate-800 text-2xl font-bold ">
                  Billing History
                </div>
                <div className="h-[470px] w-full  px-8 pt-8 pb-6 bg-white rounded-[32px] border border-gray-300 flex-col justify-start items-end gap-4 flex">
                  <div className="w-full py-2 border-b border-gray-200  gap-4 inline-flex">
                    <div className="grow shrink basis-0 text-slate-500 text-xl font-semibold ">
                      Next billing : 01/09/2022{" "}
                    </div>
                  </div>
                  <div className="pb-6 border-b border-gray-200 flex-col ">
                    <div className=" w-full p-4 gap-24 flex">
                      <div className="w-[104px] text-slate-500 text-base font-normal ">
                        01/08/2022
                      </div>
                      <div className="grow shrink basis-0 text-slate-500 text-base font-normal ">
                        Premium
                      </div>
                      <div className="text-slate-600 text-base font-normal ">
                        THB 149.00
                      </div>
                    </div>
                    <div className="w-full p-4 bg-slate-50 rounded-lg  gap-24 inline-flex">
                      <div className="w-[104px] text-slate-500 text-base font-normal ">
                        01/07/2022
                      </div>
                      <div className="grow shrink basis-0 text-slate-500 text-base font-normal ">
                        Premium
                      </div>
                      <div className="text-slate-600 text-base font-normal ">
                        THB 149.00
                      </div>
                    </div>
                    <div className="w-full p-4 justify-start items-start gap-24 inline-flex">
                      <div className="w-[104px] text-slate-500 text-base font-normal ">
                        01/06/2022
                      </div>
                      <div className="grow shrink basis-0 text-slate-500 text-base font-normal ">
                        Basic
                      </div>
                      <div className="text-slate-600 text-base font-normal ">
                        THB 59.00
                      </div>
                    </div>
                    <div className="w-full p-4 bg-slate-50 rounded-lg  gap-24 inline-flex">
                      <div className="w-[104px] text-slate-500 text-base font-normal ">
                        01/05/2022
                      </div>
                      <div className="grow shrink basis-0 text-slate-500 text-base font-normal ">
                        Basic
                      </div>
                      <div className="text-slate-600 text-base font-normal ">
                        THB 59.00
                      </div>
                    </div>
                    <div className="w-full p-4 justify-start items-start gap-24 inline-flex">
                      <div className="w-[104px] text-slate-500 text-base font-normal  ">
                        01/04/2022
                      </div>
                      <div className="grow shrink basis-0 text-slate-500 text-base font-normal ">
                        Basic
                      </div>
                      <div className="text-slate-600 text-base font-normal ">
                        THB 59.00
                      </div>
                    </div>
                  </div>
                  <button className="px-2 py-1 rounded-2xl justify-center items-center gap-2 inline-flex">
                    <div className="text-rose-700 text-base font-bold ">
                      Request PDF
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment1Page;
