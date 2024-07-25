import React from "react";
import logo from "../assets/images/logo.png";
import Box from "../assets/icons/Box.png";
import Vector from "../assets/icons/Vector.png";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/auth";

const AdminPageSidebar = () => {
  const navigate = useNavigate();

  // const { logout } = useAuth();

  const handleClick = () => {
    navigate("/package/view");
  };

  return (
    <div className="w-full md:w-[15%] min-h-screen bg-white border-r border-gray-300 flex-col justify-start items-start gap-10 inline-flex">
      <div className="self-stretch h-[135px] p-6 flex-col justify-end items-center flex mt-5">
        <button onClick={handleClick}>
          <img src={logo} alt="Logo" />
        </button>
        <div className="text-center text-slate-500 text-base font-normal">
          Admin Panel Control
        </div>
      </div>
      <div className="w-full flex-col justify-start items-start flex mt-10">
        <a href="#">
          <div className="p-6 bg-white justify-start items-start gap-4 inline-flex">
            <div className="h-6 w-6 md:h-8 md:w-8 flex justify-center items-center">
              <img src={Box} alt="Box Icon" className="w-full h-full" />
            </div>
            <div className="text-slate-600 text-sm md:text-base">
              Merry Package
            </div>
          </div>
        </a>
        <a href="#">
          <div className="w-full p-6 bg-white justify-start items-start gap-4 inline-flex">
            <div className="h-6 w-6 md:h-8 md:w-8 flex justify-center items-center">
              <img src={Vector} alt="Vector Icon" className="w-full h-full" />
            </div>
            <div className="text-slate-600 text-sm md:text-base">Complaint</div>
          </div>
        </a>
      </div>
      <div className="w-full p-6 bg-white border-t border-gray-200 justify-start items-start gap-5 inline-flex mt-auto">
        <div className="h-6 px-[3px] py-1 justify-center items-center flex" />
        <button
          onClick={() => {
            logout();
          }}
        >
          <div className="text-slate-600 text-base">Log out</div>
        </button>
      </div>
    </div>
  );
};

export default AdminPageSidebar;
