import React from "react";
import IconFacebook from "../assets/images/iconfb.png";
import IconIg from "../assets/images/iconig.png";
import IconTwit from "../assets/images/icontw.png";

const Footer = () => {
  return (
    <footer className="bg-[#F6F7FC] w-screen pb-[50px]">
      <div className="flex justify-center bg-[#F6F7FC] w-[100%] h-[40%] lg:items-center lg:h-[45%]">
        <div className="w-[327px] text-center lg:max-w-[1280px] lg:w-[1100px]">
          <div className="mt-[30px]">
            <h1 className="text-4xl text-black">
              Merry <span className="text-[#C70039] font-bold">Match</span>
            </h1>
          </div>
          <div className="mt-[30px]">
            <h3 className="text-[20px] font-semibold text-[#646D89]">
              New generation of online dating website for everyone
            </h3>
          </div>
          <div className="bg-slate-200 h-[3px] w-[327px] mt-[40px] lg:w-[700px] lg:mx-auto">
            <hr />
          </div>
          <div className="mt-[25px]">
            <p className="text-[14px]">
              copyright 2022 merrymatch.com All rights reserved
            </p>
          </div>
          <div className="flex justify-center mt-[25px] gap-5">
            <a href="https://www.facebook.com/" target="_blank">
              <img src={IconFacebook} alt="icon facebook" />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <img src={IconIg} alt="icon instagram" />
            </a>
            <a href="https://x.com/i/flow/login" target="_blank">
              <img src={IconTwit} alt="icon twitter" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
