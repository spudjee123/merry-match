import React from "react";

const AdminAddPackagePage = () => {
  return (
    <nav className="w-[90%] h-20 px-[60px] py-4 bg-white border-b border-gray-300 justify-start item-end inline-flex flex-col">
      <div className="flex flex-row">
        <div className="grow shrink basis-0 text-slate-800 text-2xl font-bold  leading-[30px]">
          Add Package
        </div>
        <div className="justify-start items-start gap-4 flex">
          <div className="px-6 py-3 bg-rose-100 rounded-[99px] shadow justify-center items-center gap-2 flex">
            <button className="text-center text-rose-800 text-base font-bold font-['Nunito'] leading-normal">
              Cancel
            </button>
          </div>
          <div className="px-6 py-3 bg-rose-700 rounded-[99px] shadow justify-center items-center gap-2 flex">
            <button className="text-center text-white text-base font-bold font-['Nunito'] leading-normal">
              Create
            </button>
          </div>
        </div>
      </div>

      <div className=" flex grow shrink basis-0 self-stretch rounded-2xl flex-col mt-[100px]">
        <label className="form-control w-full max-w-xs flex flex-row ">
          <div className="label flex flex-col mr-[500px]">
            <span className="label-text relative right-24 bottom-2 text-[16px]">
              Package Name*
            </span>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered bg-white w-[1000px] max-w-xs"
            />
          </div>

          <div className="label flex flex-col">
            <span className="label-text relative  right-24 bottom-2 text-[16px]">
              Merry limit*
            </span>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered bg-white w-[1000px] max-w-xs"
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
            X
          </button>
        </label>

        <label className="form-control mt-10 w-full max-w-xs">
          <h1>Package Detail</h1>
          <div className="label mt-10 ">
            <span className="label-text">Detail</span>
          </div>
          <div className="flex flex-row">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-[500px] "
            />
            <span className="label-text">Delete</span>
          </div>
          <div className="px-[50px] flex-col justify-start items-start gap-2 flex mt-10 relative right-14 ">
      <button className="px-6 py-3 bg-rose-100 rounded-[99px] shadow justify-center items-center gap-2 inline-flex">
        <div className="text-center text-rose-800 text-base font-bold font-['Nunito'] leading-normal">+ Add detail</div>
      </button>
    </div>
        </label>
        
      </div>
    </nav>
  );
};


export default AdminAddPackagePage;
