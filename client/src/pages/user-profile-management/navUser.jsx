import React from "react";
import { Link } from "react-router-dom";
import logo from "../non-user/logo.png";
import bell from "../non-user/bell.png";
import hamburger from "../non-user/hamburger.png";
import Frame from "../non-user/Frame.png";
import star from "../non-user/star.png";
import like from "../user-profile-management/images/like.png";
import Box from "../user-profile-management/images/Box.png";
import Vector from "../user-profile-management/images/Vector.png";
import Profile from "../user-profile-management/images/Profile.png";
import exit from "../user-profile-management/images/exit.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../../context/auth";
import useUsers from "../../hooks/use-users";

function NavUser() {
  const { logout, state } = useAuth();
  const navigate = useNavigate();
  const { userInfo, getUser } = useUsers();
  const [imgProfile, setImgProfile] = useState("");

  useEffect(() => {
    getUser(state.user.user_id);
  }, []);

  useEffect(() => {
    setImgProfile(userInfo.images[0]?.url);
  }, [userInfo]);

  const handleClickToMembership = () => {
    navigate("/check/membership")
  }

  return (
    <div className="navbar h-[70px] bg-white md:pl-[100px] md:pr-[100px] fixed w-full top-0 z-20 shadow-md">
      <div className="flex-1 px--18 lg:flex-none lg:[calc(100%-320px)]">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="w-[132px]:h-[38px] md:w-[180px] md:h-[]"
          />
        </button>
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
              <img src={Frame} alt="" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow "
            >
              <li>
                <button>Start Matching</button>
              </li>
              <li>
                <button>Merry Member</button>
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
              className="menu menu-sm dropdown-content  rounded-box z-[1] mt-3 w-52 p-2 shadow bg-white"
            >
              <li>
                <a className="justify-between">
                  <span className="badge bg-gradient-to-r from-[#742138] to-[#A87ABF] border-none text-white h-[41px] w-[179px]">
                    <img src={star} alt="" />
                    More limit Merry!
                  </span>
                </a>
              </li>
              <li id="list-1">
                <a href="/profile" id="list-profile">
                  <img src={Profile} alt="profile" className="w-[16px]" />
                  Profile
                </a>
              </li>
              <li id="list-2">
                <button
                  onClick={() => {
                    navigate("/merry-list");
                  }}
                >
                  <img src={like} alt="heart" className="w-[16px]" />
                  Merry list
                </button>
              </li>
              <li id="list-3">
                <a>
                  <img src={Box} alt="box" className="w-[16px]" />
                  Merry Membership
                </a>
              </li>
              <li id="list-4">
                <button
                  onClick={() => {
                    navigate("/complaint");
                  }}
                >
                  <img src={Vector} alt="vector" className="w-[16px]" />
                  Compliant
                </button>
              </li>
              <li id="list-5">
                <button
                  onClick={() => {
                    logout();
                  }}
                >
                  <img src={exit} alt="logout" className="w-[16px]" />
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* ขนาดจอใหญ่ อันใหม่*/}
      <div>
        <a className="sm:px-1 text-xl px--18 lg:flex-none lg:[calc(100%-320px)]">
          <img
            src={logo}
            alt="logo"
            className="w-[132px]:h-[38px] md:w-[180px] md:h-[] hidden"
          />
        </a>
      </div>
      <div className="flex-none hidden md:flex space-x-6 content-start gap-6 ">
        <div className="dropdown dropdown-end  md:flex space-x-6 content-start gap-6 ">
          <button
            onClick={() => navigate("/matching")}
            className="text-red-800 content-center md:text-[12px] lg:text-[18px]"
          >
            Start Matching
          </button>
          <button className="text-red-800 content-center md:text-[12px] lg:text-[18px]" onClick={handleClickToMembership}>
            Merry Member
          </button>
          <div className="dropdown dropdown-end">
            {/* <div
              tabIndex={0}
              role="button"
              className="btn m-1 bg-white hover:bg-white hover:border-white border-white rounded-[60px]"
            >
              <img
                src={Frame}
                alt="notification"
                className="w-[18px] h-[18px] bg-white"
              />
            </div> */}
          </div>
        </div>
        <div className="dropdown dropdown-end ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar "
          >
            <div className="w-10 rounded-full ">
              <img alt="Tailwind CSS Navbar component" src={imgProfile} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content  rounded-box z-[1] mt-3 w-52 p-2 shadow bg-white"
          >
            <li>
              <a className="justify-between" href="/membership">
                <span className="badge bg-gradient-to-r from-[#742138] to-[#A87ABF] border-none text-white h-[41px] w-[179px]">
                  <img src={star} alt="star" />
                  More limit Merry!
                </span>
              </a>
            </li>
            <li id="list-1">
              <a href="/profile" id="list-profile">
                <img src={Profile} alt="profile" className="w-[16px]" />
                Profile
              </a>
            </li>
            <li id="list-2">
              <button
                onClick={() => {
                  navigate("/merry-list");
                }}
              >
                <img src={like} alt="heart" className="w-[16px]" />
                Merry list
              </button>
            </li>
            <li id="list-3">
              <a href="/check/membership">
                <img src={Box} alt="box" className="w-[16px]" />
                Merry Membership
              </a>
            </li>
            <li id="list-4">
              <button
                onClick={() => {
                  navigate("/complaint");
                }}
              >
                <img src={Vector} alt="vector" className="w-[16px]" />
                Compliant
              </button>
            </li>
            <li id="list-5">
              <button
                onClick={() => {
                  logout();
                }}
              >
                <img src={exit} alt="logout" className="w-[16px]" />
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavUser;
