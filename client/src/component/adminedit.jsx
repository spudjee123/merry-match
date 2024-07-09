import React from "react";
import drag from "../assets/icons/drag.png"
import X from "../assets/icons/X.png"

const AdminEditPackagePage = () => {
  return (
    <section className="w-[90%] h-20 px-[60px] py-4 bg-white border-b border-gray-300 justify-start item-end inline-flex flex-col  ">
      <div className="flex flex-row">
        <div className="grow shrink basis-0 text-slate-800 text-2xl font-bold  leading-[30px]">
          Edit 'Premium'
        </div>
        <div className="justify-start items-start gap-4 flex">
          <div className="px-6 py-3 bg-rose-100 rounded-[99px] shadow justify-center items-center gap-2 flex">
            <button className="text-center text-rose-800 text-base font-bold font-['Nunito'] leading-normal">
              Cancel
            </button>
          </div>
          <div className="px-6 py-3 bg-rose-700 rounded-[99px] shadow justify-center items-center gap-2 flex">
            <button className="text-center text-white text-base font-bold font-['Nunito'] leading-normal">
              Edit
            </button>
          </div>
        </div>
      </div>

      <div className=" flex rounded-2xl flex-col mt-[100px]">
        <label className="grid grid-cols-2 gap-x-10">
          <div className="flex flex-col">
            <p className=" w-full text-[16px]">Package Name*</p>
            <input
              type="text"
              placeholder=""
              className="input input-bordered bg-white w-full "
            />
          </div>

          <div className="flex flex-col">
            <p className=" w-full text-[16px]">Merry limit*</p>
            <input
              type="number"
              placeholder=""
              className="input input-bordered bg-white w-full"
            />
          </div>
        </label>
        <label>
          <div className="label-text relative  mt-10 bottom-2 text-[16px] ">
            Icon*
          </div>
          <input
            type="image"
            className="input input-bordered bg-white w-[120px] h-[100px] max-w-xs"
          />
          <button className="relative bottom-24 right-2 bg-red-600 w-4 h-4 rounded-full">
            <img src={X} alt="" />
          </button>
        </label>

        <label className="form-control mt-5 w-full ">
          <h1>Package Detail</h1>
          <div className="label mt-5 ">
            <p className=" relative left-16">Detail</p>
          </div>
          <div className="flex flex-row">
          <img className="relative bottom-4" src={drag} alt="" />
            <input
              type="text"
              placeholder=""
              className="input input-bordered bg-white w-full"
            />
            <a href="">
              <span className="ml-4">Delete</span>
            </a>
          </div>

          <div className="label mt-5 ">
            <p className="relative left-16">Detail</p>
          </div>
          <div className="flex flex-row">
          <img className="relative bottom-4" src={drag} alt="" />
            <input
              type="text"
              placeholder=""
              className="input input-bordered bg-white w-full"
            />
            <a href="">
              <span className="ml-4">Delete</span>
            </a>
          </div>
          <div className="px-[50px] flex-col justify-start items-start gap-2 flex mb-2 relative right-14 ">
            <button className="px-6 py-3 bg-rose-100 rounded-[99px] shadow justify-center items-center gap-2 inline-flex">
              <div className="text-center text-rose-800 text-base font-bold font-['Nunito'] leading-normal">
                + Add detail
              </div>
            </button>
          </div>
        </label>
      </div>
      <footer className="border-t-2 mt-2">
        <a href=""><p className="text-end mt-2">Delete Package</p></a>
      </footer>
    </section>
  );
};

export default AdminEditPackagePage;
