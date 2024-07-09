import React from "react";
import edit from "../assets/icons/edit.png"
import bin from "../assets/icons/bin.png"
import basic from "../assets/icons/basic.png"
import platinum from "../assets/icons/platinum.png"
import premium from "../assets/icons/premium.png"
import drag from "../assets/icons/drag.png"

const AdminPageList = () => {
  return (

    
    <section className="w-[90%] h-20 px-[60px] py-4 bg-white border-b border-gray-300 justify-start item-end inline-flex flex-col">
      <div className="flex flex-row">
      <div className="grow shrink basis-0 text-slate-800 text-2xl font-bold  leading-[30px]">
        Merry Package
      </div>
      <div className="justify-start items-start gap-4 flex">
        <div className="h-12 px-4 py-3 bg-white rounded-lg border border-gray-300 justify-start items-center gap-2.5 flex">
          <div className="w-6 h-6 pl-[2.40px] pr-[2.38px] pt-[2.40px] pb-[2.38px] justify-center items-center flex" />
          <div className=" w-[320px] grow shrink basis-0 text-slate-400 text-base font-normal  leading-normal">
            Search...
          </div>
        </div>
        <div className="px-6 py-3 bg-rose-700 rounded-[99px] shadow justify-center items-center gap-2 flex">
          <button className="text-center text-white text-base font-bold  leading-normal">
            + Add Package
          </button>
        </div>
      </div>
      </div>


  <div className=" flex grow shrink basis-0 self-stretch rounded-2xl flex-col mt-[100px]">
    <table className="self-stretch bg-gray-300 justify-start items-start inline-flex gap-[120px] rounded-t-lg">
      <div className="w-14 h-[41px] " />
      <tr className="h-[41px] px-4 py-2.5 justify-start items-start flex gap-[150px] ">
        <th className="grow shrink basis-0 text-justify text-slate-600 text-sm font-medium  ">Icon</th>
        <th className="grow shrink basis-0 text-justify text-slate-600 text-sm font-medium  ">Package_name</th>
        <th className="grow shrink basis-0 text-justify text-slate-600 text-sm font-medium  ">Merry_limit</th>
        <th className="grow shrink basis-0 text-justify text-slate-600 text-sm font-medium  ">Created_date</th>
        <th className="grow shrink basis-0 text-justify text-slate-600 text-sm font-medium  ">Updated_date</th>
        <th className="grow shrink basis-0 text-justify text-slate-600 text-sm font-medium  ">Action</th>
      </tr>
    
    </table>
    {/* Basic package */}
      <div className="h-[88px] justify-start items-start flex   " >
        <div className=" self-stretch px-[11px] py-1 justify-center items-center flex  "><img src={drag} alt="" /></div> 
        <div className="h-[88px]  justify-center items-center gap-2.5 flex">
          <div className="text-justify text-black text-base font-normal  leading-normal mr-[90px] ml-1">1</div>
        </div>
        <div className="w-20 h-[88px] px-4 py-8 justify-start items-center gap-2.5 flex mr-[100px]">
          <div className="w-8 h-8 px-[3.20px] py-[4.80px] justify-center items-center flex "><img src={basic} alt="" /></div>
        </div>
        <div className="h-[88px] px-4 py-8 justify-start items-center gap-2.5 flex mr-[180px]">
          <div className="text-justify text-black text-base font-normal  leading-normal">Basic</div>
        </div>
        <div className="h-[88px] px-4 py-8 justify-start items-center gap-2.5 flex mr-[130px]">
          <div className="text-justify text-black text-base font-normal  leading-normal">25 Merry</div>
        </div>
        <div className="h-[88px] px-4 py-8 justify-start items-center gap-2.5 flex mr-[50px]">
          <div className="text-justify text-black text-base font-normal  leading-normal">12/02/2022 10:30PM</div>
        </div>
        <div className="grow shrink basis-0 h-[88px] px-4 py-8 justify-start items-center flex">
          <div className="text-justify text-black text-base font-normal  leading-normal">12/02/2022 10:30PM</div>
        </div>
        <div className="w-[120px] h-[88px] pl-[27px] pr-7 justify-center items-start flex">
        <div className="grow shrink basis-0 self-stretch px-[3px] py-[1.50px] justify-center items-center inline-flex"><img src={bin} alt="" /></div> 
        <div className="grow shrink basis-0 self-stretch px-[3px] py-[1.50px] justify-center items-center inline-flex ml-2"><img src={edit} alt="" /></div> 
      </div>
      </div>

{/* Platinum package */}
<div className="h-[88px] justify-start items-start flex   " >
        <div className=" self-stretch px-[11px] py-1 justify-center items-center flex  "><img src={drag} alt="" /></div> 
        <div className="h-[88px]  justify-center items-center gap-2.5 flex">
          <div className="text-justify text-black text-base font-normal  leading-normal mr-[90px] ml-1">2</div>
        </div>
        <div className="w-20 h-[88px] px-4 py-8 justify-start items-center gap-2.5 flex mr-[100px]">
          <div className="w-8 h-8 px-[3.20px] py-[4.80px] justify-center items-center flex "><img src={platinum} alt="" /></div>
        </div>
        <div className="h-[88px] px-4 py-8 justify-start items-center gap-2.5 flex mr-[150px]">
          <div className="text-justify text-black text-base font-normal  leading-normal">Platinum</div>
        </div>
        <div className="h-[88px] px-4 py-8 justify-start items-center gap-2.5 flex mr-[130px]">
          <div className="text-justify text-black text-base font-normal  leading-normal">45 Merry</div>
        </div>
        <div className="h-[88px] px-4 py-8 justify-start items-center gap-2.5 flex mr-[50px]">
          <div className="text-justify text-black text-base font-normal  leading-normal">12/02/2022 10:30PM</div>
        </div>
        <div className="grow shrink basis-0 h-[88px] px-4 py-8 justify-start items-center flex">
          <div className="text-justify text-black text-base font-normal  leading-normal">12/02/2022 10:30PM</div>
        </div>
        <div className="w-[120px] h-[88px] pl-[27px] pr-7 justify-center items-start flex">
        <div className="grow shrink basis-0 self-stretch px-[3px] py-[1.50px] justify-center items-center inline-flex"><img src={bin} alt="" /></div> 
        <div className="grow shrink basis-0 self-stretch px-[3px] py-[1.50px] justify-center items-center inline-flex ml-2"><img src={edit} alt="" /></div> 
      </div>
      </div>

      {/* Premium package */}
      <div className="h-[88px] justify-start items-start flex   " >
        <div className=" self-stretch px-[11px] py-1 justify-center items-center flex  "><img src={drag} alt="" /></div> 
        <div className="h-[88px]  justify-center items-center gap-2.5 flex">
          <div className="text-justify text-black text-base font-normal  leading-normal mr-[90px] ml-1">3</div>
        </div>
        <div className="w-20 h-[88px] px-4 py-8 justify-start items-center gap-2.5 flex mr-[100px]">
          <div className="w-8 h-8 px-[3.20px] py-[4.80px] justify-center items-center flex "><img src={premium} alt="" /></div>
        </div>
        <div className="h-[88px] px-4 py-8 justify-start items-center gap-2.5 flex mr-[150px]">
          <div className="text-justify text-black text-base font-normal  leading-normal">Premium</div>
        </div>
        <div className="h-[88px] px-4 py-8 justify-start items-center gap-2.5 flex mr-[130px]">
          <div className="text-justify text-black text-base font-normal  leading-normal">70 Merry</div>
        </div>
        <div className="h-[88px] px-4 py-8 justify-start items-center gap-2.5 flex mr-[50px]">
          <div className="text-justify text-black text-base font-normal  leading-normal">12/02/2022 10:30PM</div>
        </div>
        <div className="grow shrink basis-0 h-[88px] px-4 py-8 justify-start items-center flex">
          <div className="text-justify text-black text-base font-normal  leading-normal">12/02/2022 10:30PM</div>
        </div>
        <div className="w-[120px] h-[88px] pl-[27px] pr-7 justify-center items-start flex">
        <div className="grow shrink basis-0 self-stretch px-[3px] py-[1.50px] justify-center items-center inline-flex"><img src={bin} alt="" /></div> 
        <div className="grow shrink basis-0 self-stretch px-[3px] py-[1.50px] justify-center items-center inline-flex ml-2"><img src={edit} alt="" /></div> 
      </div>
      </div>
      
      
    </div>
  
 </section>

  );
};

export default AdminPageList;
