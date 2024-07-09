import React from "react";
import logo from "../assets/images/logo.png"
import Box from "../assets/icons/Box.png"
import Vector from "../assets/icons/Vector.png"

const AdminPageSidebar = () => {
  
  return (
    <div className="w-[15%] min-h-screen bg-white border-r border-gray-300 flex-col justify-start items-start gap-10 inline-flex">
    <div className="self-stretch h-[135px] p-6 flex-col justify-end items-center flex mt-5" >
        <img src={logo} alt="" />
      <div className="text-center text-slate-500 text-base font-normal  ">Admin Panel Control</div>
    </div>
    <div className=" flex-col justify-start items-start flex mt-10">
      <div className="p-6 bg-white justify-start items-start gap-4 inline-flex">
        <div className=" h-6 px-[2.25px] pt-[1.50px] pb-[1.82px] justify-center items-center flex"><img src={Box} alt="" /></div> 
        <div className=" text-slate-600 text-base  ">Merry Package</div>
      </div>
      <div className=" p-6 bg-white justify-start items-start gap-4 inline-flex">
        <div className=" h-6 px-[2.36px] pt-[1.94px] pb-[4.81px] justify-center items-center flex"><img src={Vector} alt="" /></div> 
        <div className=" text-slate-600 text-base  ">Complaint</div>
      </div>
    </div>
    <div className=" p-6 bg-white border-t border-gray-200 justify-start items-start gap-5 inline-flex mt-[300px]">
      <div className=" h-6 px-[3px] py-1 justify-center items-center flex" />
      <a href=""><div className=" text-slate-600 text-base ">Log out</div></a>
    </div>
  </div>
  )
}

export default AdminPageSidebar;
