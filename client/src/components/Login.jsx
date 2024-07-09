import React from "react";
import ImgLogin from "../assets/images/loginpage.png";
import ImgCercle from "../assets/images/cercleloginpage.png";

const Login = () => {
  return (
    <section className="bg-white h-screen w-screen relative">
      <img
        src={ImgCercle}
        alt="cercle"
        className="hidden lg:block absolute top-10 left-0 z-0"
      />
      <div className="flex flex-col lg:flex-row lg:max-w-[1300px] lg:mx-auto relative z-10">
        <div className="mx-auto mt-[50px] lg:relative">
          <img
            className="h-[266px] w-[177px] lg:h-[677px] lg:w-[450px] z-10 relative"
            src={ImgLogin}
            alt="Man sitting cross-legged playing on a laptop"
          />
        </div>
        <div className="mx-auto mt-[20px] lg:my-[auto]">
          <div>
            <h3 className="text-[14px] text-[#7B4429]">LOGIN</h3>
            <h2 className="text-[32px] text-[#A62D82] font-bold lg:text-[46px]">
              Welcome back to
            </h2>
            <h2 className="text-[32px] text-[#A62D82] font-bold lg:text-[46px]">
              Merry Match
            </h2>
          </div>
          <div className="mt-[30px]">
            <h4 className="text-[16px] text-black mb-[10px]">
              Username or Email
            </h4>
            <input
              type="text"
              placeholder="Enter Username or Email"
              className="bg-white p-[12px] h-[48px] w-[343px] rounded-lg border-[1px] lg:w-[425px]"
            />
            <h4 className="text-[16px] text-black mb-[10px] mt-[30px]">
              Password
            </h4>
            <input
              type="text"
              placeholder="Enter password"
              className="bg-white p-[12px] h-[48px] w-[343px] rounded-lg border-[1px] lg:w-[425px]"
            />
          </div>
          <div className="lg:flex lg:justify-center mt-[30px]">
            <button className="text-white bg-[#C70039] h-[48px] w-[343px] text-[16px] rounded-full lg:mx-auto">
              Log in
            </button>
          </div>
          <div>
            <h4 className="text-[16px] text-black mt-[40px] text-center">
              Don't have account?
              <span className="cursor-pointer text-[#C70039] font-bold">
                Register
              </span>
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
