import ImgLogin from "../assets/images/loginpage.png";
import ImgCercle from "../assets/images/cercleloginpage.png";
import Nav from "../pages/non-user/nav";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/auth";
import Title from "./common/page-title";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const { login, state, setState } = useAuth();
  const [errors, setErrors] = useState({});

  const handleLogin = (event) => {
    event.preventDefault();
    const validateError = {};

    if (!userInfo.usernameOrEmail) {
      validateError.usernameOrEmail = "Username or Email is required";
    }
    if (!userInfo.password) {
      validateError.password = "Password is required";
    }
    if (Object.keys(validateError).length > 0) {
      setErrors(validateError);
    }

    login({
      username: userInfo.usernameOrEmail,
      password: userInfo.password,
    });
  };

  if (state.error) {
    const error = state.error;
    if (error.response.status === 404) {
      document.getElementById("invalid-username-popup").showModal();
      setState({ ...state, error: null });
    }
  }

  return (
    <div>
      <Nav />
      <form
        className="bg-main h-screen w-full relative mt-[100px]"
        onSubmit={handleLogin}
      >
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
            <Title
              title="LOGIN"
              upperDetail="Welcome back to"
              lowerDetail="Merry Match"
            />
            {/* <div>
              <h3 className="text-[14px] text-[#7B4429]">LOGIN</h3>
              <h2 className="text-[32px] text-[#A62D82] font-bold lg:text-[46px]">
                Welcome back to
              </h2>
              <h2 className="text-[32px] text-[#A62D82] font-bold lg:text-[46px]">
                Merry Match
              </h2>
            </div> */}
            <div className="mt-9">
              <h4 className="text-[16px] text-black mb-[10px]">
                Username or Email
              </h4>
              <input
                id="username-email"
                name="usernameOrPassword"
                className="input bg-white p-[12px] h-[48px] w-[343px] rounded-lg border-[1px] lg:w-[425px]"
                type="text"
                value={userInfo.usernameOrEmail}
                placeholder="Enter Username or Email"
                onChange={(event) =>
                  setUserInfo({
                    ...userInfo,
                    usernameOrEmail: event.target.value,
                  })
                }
                required
              />
              {errors.usernameOrEmail && (
                <div id="error-msg-email" className="text-rose-600">
                  {errors.usernameOrEmail}
                </div>
              )}
              <h4 className="text-[16px] text-black mb-[10px] mt-[30px]">
                Password
              </h4>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                className="bg-white p-[12px] h-[48px] w-[343px] rounded-lg border-[1px] lg:w-[425px]"
                onChange={(event) =>
                  setUserInfo({ ...userInfo, password: event.target.value })
                }
              />
              {errors.password && (
                <div id="error-password" className="text-rose-600">
                  {errors.password}
                </div>
              )}
            </div>
            <div className="lg:flex lg:justify-center mt-[30px]">
              <button
                id="login-btn"
                className=" text-white bg-red-500 hover:bg-red-400 active:bg-red-600 h-[48px] w-full text-[16px] rounded-full lg:mx-auto"
                onClick={handleLogin}
              >
                {state.loading ? (
                  <p className="flex gap-4 pl-4">
                    <span className="loading loading-spinner loading-sm"></span>
                    Getting You Merry...
                  </p>
                ) : (
                  "Log in"
                )}
              </button>
            </div>
            <div>
              <h4 className="text-[16px] text-black mt-[40px] text-start">
                Don't have account?
                <span className="cursor-pointer text-[#C70039] font-bold">
                  <Link to={"/register"}> Register</Link>
                </span>
              </h4>
            </div>
          </div>
        </div>
      </form>
      <dialog id="invalid-username-popup" className="modal">
        <div className="modal-box">
          <h3 className=" text-body1 text-black">
            Oops, Something's Not Right
          </h3>
          <p className="py-4 text-body2 text-black">
            We couldn't match that username or password. <br />
            Please try again.{" "}
          </p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Login;
