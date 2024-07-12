import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/images/logo.png";
import bell from "./assets/images/bell.png";
import hamburger from "./assets/images/hamburger.png";

function Nav() {
  return (
    <div className="navbar bg-white md:pl-[100px] md:pr-[100px] ">
      <div className="flex-1 px--18 lg:flex-none lg:[calc(100%-320px)]">
        <a>
          <img
            src={logo}
            alt="logo"
            className="w-[132px]:h-[38px] md:w-[180px] md:h-[]"
          />
        </a>
      </div>
      <div className="flex flex-1 justify-end px-2">
        <div className="flex items-stretch">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost rounded-btn md:hidden"
            >
              <img src={bell} alt="" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow "
            >
              <li>
                <Link>Why Merry Match?</Link>
              </li>
              <li>
                <Link>How to Merry</Link>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost rounded-btn md:hidden"
            >
              <img src={hamburger} alt="" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-22 p-2 shadow"
            >
              <li>
                <Link >Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* ขนาดจอใหญ่ */}
      <nav className="max-w-full px-4 sm:px-6 lg:px-8 bg-white h-[100px] flex items-center justify-center  flex-wrap ">
        <div className="flex flex-rows flex-wrap w-full justify-between place-content-center">
          <div className="hidden md:flex space-x-6 content-start gap-6 ">
            <Link
              to="/"
              className="text-red-800 content-center md:text-[12px] lg:text-[18px]"
            >
              {" "}
              Why Merry Match?
            </Link>
            <Link
              to="/"
              className="text-red-800 content-center md:text-[12px] lg:text-[18px]"
            >
              {" "}
              How to Merry
            </Link>
            <Link to="/login" className="content-center">
              {" "}
              <button className="lg:w-[139px] lg:h-[52px] lg:text-[18px] rounded-[99px] bg-red-500 text-white content-center md:w-[112px] md:h-[48px]">
                Login
              </button>{" "}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
