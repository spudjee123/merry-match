import ImgLogin from "../assets/images/loginpage.png";
import ImgCercle from "../assets/images/cercleloginpage.png";
import Nav from "../pages/non-user/nav";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { useAuth } from "../context/auth";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    usernameOrEmail: "",
    password: "",
  });
  // const { login, state } = useAuth();
  const [errors, setErrors] = useState({});

  const handleLogin = async (event) => {
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
      return;
    }

    try {
      console.log(userInfo);
      // login({
      //   username: userInfo.usernameOrEmail,
      //   password: userInfo.password,
      // });
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "There was an error submitting the form" });
    }
  };

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
                id="username-email"
                name="usernameOrPassword"
                className="input bg-white p-[12px] h-[48px] w-[343px] rounded-lg border-[1px] lg:w-[425px]"
                type="text"
                value={userInfo.usernameOrEmail}
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
              <Link>
                <button
                  id="login-btn"
                  className="text-white bg-[#C70039] h-[48px] w-[343px] text-[16px] rounded-full lg:mx-auto"
                  onClick={handleLogin}
                >
                  Log in
                </button>
              </Link>
            </div>
            <div>
              <h4 className="text-[16px] text-black mt-[40px] text-center">
                Don't have account?
                <span className="cursor-pointer text-[#C70039] font-bold">
                  <Link to={"/register"}>Register</Link>
                </span>
              </h4>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
