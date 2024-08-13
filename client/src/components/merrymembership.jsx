import React, { useState, useEffect } from "react";
import NavUser from "../pages/user-profile-management/navUser.jsx";
import Footer from "./Footer.jsx";
import premium from "../assets/icons/premium.png";
import Frame from "../assets/icons/Frame.png";
import { useAuth } from "../context/auth.jsx";
import axios from "axios";

const MerryMembership = () => {
  const { state } = useAuth();
  const userName = state.user?.username;
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [hasPackage, setHasPackage] = useState(true);
  const [getPackageName,setGetPackageName] = useState("")
  const [getPrice,setGetPrice] = useState("")
  const [getMerry,setGetMerry] = useState("")
  const [getIcon,setGetIcon] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await axios.post("http://localhost:4001/payments/", { userName: userName });
        console.log("abc", result); 
        setGetPackageName(result.data.data.packages_name)
        setGetPrice(result.data.data.price)
        setGetMerry(result.data.data.merry_limit)
        setGetIcon(result.data.data.icons)
      } catch (error) {
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
        alert("Get error");
      }
    };
  
    fetchData();
  }, [userName]);

  const getData = async () => {
    try {
      console.log("name",userName);
      
      const result = await axios.get("http://localhost:4001/membership",{name: userName});
      setPackages(result.data);
      console.log("abc", result);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCancelPackage = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async() => {
    try {
       await axios.put('http://localhost:4001/payments/cancel/package', { userName: userName });
      setHasPackage(false); 
      setIsDeleteDialogOpen(false); 
    } catch (error) {
      console.error('Error cancelling package:', error);
      alert('Error cancelling package');
    }
  };

  return (
    <section className="w-full">
      <nav className="">
        <NavUser />
      </nav>

      <div className="w-full">
        <div className="w-full h-auto md:h-[1585px] px-4 md:pl-[254px] md:pr-[255px] pt-20 pb-28 bg-white flex-col justify-start items-center inline-flex mt-16">
          <div className="self-stretch flex-col justify-start items-center gap-20 inline-flex">
            <div className="w-full justify-start items-end gap-4 inline-flex">
              <div className="grow shrink basis-0 flex-col justify-start items-end gap-[37px] inline-flex">
                <div className="self-stretch h-[145px] flex-col justify-start items-start gap-2 flex">
                  <p className="self-stretch text-yellow-900 text-sm font-semibold uppercase ">
                    Merry membership
                  </p>
                  <p className="self-stretch text-fuchsia-800 text-[36px] md:text-[46px] font-extrabold ">
                    Manage your membership
                    <br />
                    and payment method
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-col justify-start items-start gap-[60px] flex w-full">
              <div className="flex-col justify-start items-start gap-6 flex w-full">
                <p className="w-full text-slate-800 text-xl md:text-2xl font-bold ">
                  Merry Membership Package
                </p>
                {hasPackage ? (
                  <div className="h-auto md:h-[222px] w-full px-4 md:px-8 pt-8 pb-6 bg-gradient-to-br from-pink-900 to-pink-300 rounded-[32px] shadow flex-col justify-start items-end gap-4 flex">
                    <div className="self-stretch pb-10 border-b border-pink-400 justify-between items-start inline-flex flex-wrap">
                      <div className="justify-start items-center gap-6 flex flex-wrap">
                        <div className="w-full md:w-[319px] justify-start items-start gap-4 flex">
                          <div className="w-[78px] h-[78px] p-[21px] bg-slate-50 rounded-2xl justify-center items-center flex">
                            <img className="" src={getIcon} alt="" />
                          </div>
                          <div className="flex-col justify-start items-start gap-2 inline-flex">
                            <p className="text-white text-[24px] md:text-[32px] font-bold ">
                              {getPackageName}
                            </p>
                            <div className="justify-start items-baseline gap-1.5 inline-flex">
                              <p className="text-pink-200 text-lg md:text-xl font-semibold ">
                                THB {getPrice}.00
                              </p>
                              <p className="text-pink-200 text-base font-normal ">
                                /Month
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-[357px] flex-col justify-center items-center gap-2 inline-flex">
                          <div className="justify-start items-start gap-3 inline-flex">
                            <p className="grow shrink basis-0 text-pink-100 text-base font-normal ">
                              ‘Merry’ more than a daily limited
                            </p>
                          </div>
                          <div className="justify-start items-start gap-3 inline-flex">
                            <p className="grow shrink basis-0 text-pink-100 text-base font-normal ">
                              Up to {getMerry} Merry per day
                            </p>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-1 bg-red-100 rounded-[99px] justify-center items-center gap-1 flex">
                        <p className="text-amber-700 text-base font-extrabold ">
                          Active
                        </p>
                      </button>
                    </div>
                    <button
                      onClick={handleCancelPackage}
                      className="px-2 py-1 rounded-2xl justify-center items-center gap-2 inline-flex"
                    >
                      <p className="text-white text-base font-bold ">
                        Cancel Package
                      </p>
                    </button>
                  </div>
                ) : (
                  <div className="h-auto md:h-[222px] w-full px-4 md:px-8 pt-8 pb-6 bg-gray-100 rounded-[32px] shadow flex-col justify-center items-center flex">
                    <p className="text-gray-500 text-xl md:text-2xl font-bold ">
                      This user didn't have any package
                    </p>
                  </div>
                )}
              </div>
              <div className="flex-col justify-start items-start gap-6 flex w-full">
                <p className="text-slate-800 text-xl md:text-2xl font-bold ">
                  Payment Method
                </p>
                <div className="h-auto md:h-[194px] w-full px-4 md:px-8 pt-8 pb-6 bg-white rounded-[32px] border border-gray-300 flex-col justify-start items-end gap-4 flex">
                  <div className="self-stretch pb-6 border-b border-gray-200 justify-start items-center gap-6 inline-flex">
                    <div className="grow shrink basis-0 self-stretch justify-start items-start gap-4 flex">
                      <div className="w-[66px] h-[66px] p-[17px] bg-slate-50 rounded-2xl justify-center items-center flex">
                        <img src={Frame} alt="" />
                      </div>
                      <div className="flex-col justify-start items-start gap-2 inline-flex">
                        <p className="text-fuchsia-900 text-lg md:text-2xl font-bold ">
                          Visa ending *42424
                        </p>
                        <div className="justify-start items-center gap-1.5 inline-flex">
                          <p className="text-slate-500 text-base font-normal ">
                            Expire 04/2025
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="px-2 py-1 rounded-2xl justify-center items-center gap-2 inline-flex">
                    <p className="text-rose-700 text-base font-bold ">
                      Edit Payment Method
                    </p>
                  </button>
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-6 flex w-full">
                <p className="w-full text-slate-800 text-xl md:text-2xl font-bold ">
                  Billing History
                </p>
                <div className="h-auto md:h-[470px] w-full px-4 md:px-8 pt-8 pb-6 bg-white rounded-[32px] border border-gray-300 flex-col justify-start items-end gap-4 flex">
                  <div className="w-full py-2 border-b border-gray-200 gap-4 inline-flex">
                    <p className="grow shrink basis-0 text-slate-500 text-lg md:text-xl font-semibold ">
                      Next billing: 01/09/2022
                    </p>
                  </div>
                  <div className="pb-6 border-b border-gray-200 flex-col w-full">
                    <div className="w-full p-4 gap-24 flex flex-wrap">
                      <p className="w-[104px] text-slate-500 text-base font-normal ">
                        01/08/2022
                      </p>
                      <p className="grow shrink basis-0 text-slate-500 text-base font-normal ">
                        Premium
                      </p>
                      <p className="text-slate-600 text-base font-normal ">
                        THB 149.00
                      </p>
                    </div>
                    <div className="w-full p-4 bg-slate-50 rounded-lg gap-24 inline-flex">
                      <p className="w-[104px] text-slate-500 text-base font-normal ">
                        01/07/2022
                      </p>
                      <p className="grow shrink basis-0 text-slate-500 text-base font-normal ">
                        Premium
                      </p>
                      <p className="text-slate-600 text-base font-normal ">
                        THB 149.00
                      </p>
                    </div>
                    <div className="w-full p-4 justify-start items-start gap-24 inline-flex">
                      <p className="w-[104px] text-slate-500 text-base font-normal ">
                        01/06/2022
                      </p>
                      <div className="grow shrink basis-0 text-slate-500 text-base font-normal ">
                        Basic
                      </div>
                      <p className="text-slate-600 text-base font-normal ">
                        THB 59.00
                      </p>
                    </div>
                    <div className="w-full p-4 bg-slate-50 rounded-lg gap-24 inline-flex">
                      <p className="w-[104px] text-slate-500 text-base font-normal ">
                        01/05/2022
                      </p>
                      <p className="grow shrink basis-0 text-slate-500 text-base font-normal ">
                        Basic
                      </p>
                      <p className="text-slate-600 text-base font-normal ">
                        THB 59.00
                      </p>
                    </div>
                    <div className="w-full p-4 justify-start items-start gap-24 inline-flex">
                      <p className="w-[104px] text-slate-500 text-base font-normal ">
                        01/04/2022
                      </p>
                      <p className="grow shrink basis-0 text-slate-500 text-base font-normal ">
                        Basic
                      </p>
                      <p className="text-slate-600 text-base font-normal ">
                        THB 59.00
                      </p>
                    </div>
                  </div>
                  <button className="px-2 py-1 rounded-2xl justify-center items-center gap-2 inline-flex">
                    <p className="text-rose-700 text-base font-bold ">
                      Request PDF
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="">
        <Footer />
      </footer>

      {isDeleteDialogOpen && (
        <dialog
          id="delete"
          className="modal rounded-2xl lg:rounded-3xl p-0"
          open
        >
          <div className="modal-box p-0 shadow-primary ">
            <div className="flex justify-between items-center h-14 px-6 py-2 border-b-2 m-0">
              <h3 className="text-xl leading-6 font-semibold">
                Delete Confirmation
              </h3>
              <button
                className="btn btn-sm btn-square btn-ghost"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                X
              </button>
            </div>
            <div className="p-4 lg:p-6 flex flex-col gap-6">
              <p className="text-color-gray-700 leading-6">
                Are you sure you want to cancel this package?
              </p>
              <div className="flex flex-col lg:flex-row gap-4">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-color-red-100 px-6 py-3 max-lg:w-full rounded-[99px] text-color-red-600 leading-6 font-bold drop-shadow-secondary"
                >
                  Yes, I want to cancel
                </button>
                <button
                  onClick={() => setIsDeleteDialogOpen(false)}
                  className="bg-color-red-500 px-6 py-3 max-lg:w-full rounded-[99px] text-white leading-6 font-bold drop-shadow-primary"
                >
                  No, I don’t want
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
};

export default MerryMembership;
