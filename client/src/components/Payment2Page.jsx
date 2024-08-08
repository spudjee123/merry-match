import NavUser from "../pages/user-profile-management/navUser";
import Success from "../assets/icons/successpay2.png";
import IconPremium from "../assets/icons/iconpay2.png";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import hookPayment from './hooks/hookpayment'

const Payment2Page = () => {
  const {filteredPackages} = hookPayment()
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleCheckPackage = () => {
    navigate("/check/membership");
  };

  return (
    <section className="bg-white h-full w-full">
      <div>
        <NavUser />
      </div>
      <div className="pt-[100px] w-[90%] mx-auto lg:hidden md:pt-[150px]">
        <div>
          <div>
            <img src={Success} alt="" />
          </div>
          <div>
            <p className="text-[#7B4429] text-[14px] my-[10px]">
              PAYMENT SUCCESS
            </p>
          </div>
          <div>
            <h2 className="text-[#A62D82] text-[32px] font-bold">
              Welcome Merry Membership! Thank you for joining us
            </h2>
          </div>
        </div>
        {/* success card */}
        <div className="bg-gradient-to-r from-[#742138] to-[#A878BF] px-[20px] py-[25px] rounded-3xl mt-[50px]">
          {filteredPackages.map((item, index) => (
            <div key={index}>
              <div>
                <img src={item.icons} alt="" />
              </div>
              <div className="mt-[10px]">
                <h2 className="text-white text-[32px] font-bold">
                  {item.packages_name}
                </h2>
                <p className="text-white text-[26px]">
                  THB {item.price}.00{" "}
                  <span className="text-[16px]">/Mouth</span>
                </p>
              </div>
              <div className="mt-[15px]">
                <div className="flex gap-5">
                  <span className="h-[20px] w-[20px]">
                    <img src={Success} alt="" />
                  </span>
                  <p className="text-white">Merry more than a daily limited</p>
                </div>
                <div className="flex gap-5 mt-[15px] mb-[40px]">
                  <span className="h-[20px] w-[20px]">
                    <img src={Success} alt="" />
                  </span>
                  <p className="text-white">
                    Up to {item.merry_limit} Merry per day
                  </p>
                </div>
              </div>
              <div className="w-[95%] mx-auto mb-[40px]">
                <hr />
              </div>
              <div>
                <div className="flex justify-between">
                  <div className="mb-[15px]">
                    <p className="text-white">Start Membership</p>
                  </div>
                  <div>
                    <p className="text-white">01/04/2022</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-white">Next billing</p>
                  </div>
                  <div>
                    <p className="text-white">01/05/2022</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* button */}
        <div className="mt-[50px] flex justify-between mb-[120px] gap-5">
          <div>
            <button
              className="bg-[#FFE1EA] text-[#C70039] rounded-full py-[15px] px-[25px] font-bold"
              onClick={handleBackToHome}
            >
              Back to home
            </button>
          </div>
          <div>
            <button
              className="bg-[#C70039] text-[#FFE1EA] rounded-full py-[15px] px-[35px] font-bold"
              onClick={handleCheckPackage}
            >
              Check Membership
            </button>
          </div>
        </div>
      </div>

      {/* display lg up */}
      <div className="hidden lg:max-w-[800px] lg:flex lg:mx-auto lg:mt-[100px] lg:mb-[300px] 2xl:max-w-[1200px]">
        {filteredPackages.length > 0 ? (
        filteredPackages.map((item, index) => (
          <div
            key={index}
            className="hidden lg:max-w-[800px] lg:flex lg:mx-auto lg:mt-[100px] lg:mb-[300px] 2xl:max-w-[1200px]"
          >
            <div className="lg:pt-[100px] lg:w-[70%] lg:mx-auto 2xl:w-[60%]">
              <div className="lg:h-[80px] lg:w-[80px]">
                <img src={Success} alt="Success" />
              </div>
              <div>
                <p className="text-[#7B4429] text-[14px] my-[10px]">PAYMENT SUCCESS</p>
              </div>
              <div>
                <h2 className="text-[#A62D82] text-[32px] font-bold">
                  Welcome Merry Membership! Thank you for joining us
                </h2>
              </div>
              <div className="lg:flex lg:gap-8 lg:mt-[100px]">
                <div>
                  <button
                    className="bg-[#FFE1EA] text-[#C70039] rounded-full py-[15px] px-[25px] font-bold"
                    onClick={handleBackToHome}
                  >
                    Back to home
                  </button>
                </div>
                <div>
                  <button
                    className="bg-[#C70039] text-[#FFE1EA] rounded-full py-[15px] px-[35px] font-bold"
                    onClick={handleCheckPackage}
                  >
                    Check Membership
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-gradient-to-r from-[#742138] to-[#A878BF] px-[20px] py-[25px] rounded-3xl mt-[50px]">
                <div>
                  <img src={item.icons} alt={item.packages_name} />
                </div>
                <div className="mt-[10px]">
                  <h2 className="text-white text-[32px] font-bold">
                    {item.packages_name}
                  </h2>
                  <p className="text-white text-[26px]">
                    THB {item.price}.00 <span className="text-[16px]">/Month</span>
                  </p>
                </div>
                <div className="mt-[15px]">
                  <div className="flex gap-5">
                    <span className="h-[20px] w-[20px]">
                      <img src={Success} alt="Success" />
                    </span>
                    <p className="text-white">Merry more than a daily limited</p>
                  </div>
                  <div className="flex gap-5 mt-[15px] mb-[40px]">
                    <span className="h-[20px] w-[20px]">
                      <img src={Success} alt="Success" />
                    </span>
                    <p className="text-white">Up to {item.merry_limit} Merry per day</p>
                  </div>
                </div>
                <div className="w-[95%] mx-auto mb-[40px]">
                  <hr />
                </div>
                <div>
                  <div className="flex justify-between">
                    <div className="mb-[15px]">
                      <p className="text-white">Start Membership</p>
                    </div>
                    <div>
                      <p className="text-white">01/04/2022</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-white">Next billing</p>
                    </div>
                    <div>
                      <p className="text-white">01/05/2022</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading package details...</p>
      )}
      </div>
      <div>
        <Footer />
      </div>
    </section>
  );
};

export default Payment2Page;
