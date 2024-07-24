import React, { useState, useMemo, useRef } from "react";

function MatchingFilter() {
  <section>
    <div className="  ">
      <div className="relative">
        <img
          src={
            images[0] && images[1]
              ? URL.createObjectURL(images[isSecondImage ? 1 : 0])
              : ""
          }
          className=" w-full aspect-[26/21] object-cover rounded-b-[32px]"
          alt={"preview photo " + isSecondImage ? "1" : "0"}
        />
        <button className=" bg-dark absolute w-12 h-12 flex justify-center items-center rounded-full top-2 left-2 shadow-primary">
          <img
            src={preview_exit_icon}
            width={16}
            height={16}
            alt="preview exit icon"
            onClick={(event) => {
              event.preventDefault();
              setIsMobilePreview(false);
            }}
            className=" shadow-2xl"
          />
        </button>
      </div>
      <div className=" h-12 flex justify-between items-center relative text-gray-700 ">
        <div className=" flex justify-center absolute top-[-30px] w-full gap-6 z-10">
          <button className=" w-[60px] h-[60px] bg-white shadow-primary rounded-2xl">
            <img
              src={reject_icon}
              width={40}
              height={40}
              className=" mx-auto"
            />
          </button>
          <button className=" w-[60px] h-[60px] bg-white shadow-primary rounded-2xl">
            <img src={love_icon} width={50} height={50} className=" mx-auto" />
          </button>
        </div>
        <p className=" w-[72px] flex justify-center items-center z-20">
          {isSecondImage ? "2" : "1"}
          <span className=" text-gray-600">/2</span>
        </p>
        <div className=" flex z-20">
          <button
            type="button"
            id="back-preview-image-btn"
            onClick={(event) => {
              event.preventDefault();
              setIsSecondImage(false);
            }}
            className=" w-12 h-12 rounded-xl flex justify-center items-center"
          >
            <img src={back_icon} width={16} height={16} alt="back photo icon" />
          </button>
          <button
            type="button"
            id="next-preview-image-btn"
            onClick={(event) => {
              event.preventDefault();
              setIsSecondImage(true);
            }}
            className=" w-12 h-12 rounded-xl flex justify-center items-center"
          >
            <img src={next_icon} width={16} height={16} alt="next photo icon" />
          </button>
        </div>
      </div>
    </div>
    <div className="flex flex-col px-4 py-6 gap-6 items-center text-gray-900 leading-6">
      <article className=" w-full">
        <h1 className=" text-[46px] leading-[57.5px] font-extrabold mb-2">
          {"John Snow"} <span className=" text-gray-700">{26}</span>
        </h1>
        <div className=" flex gap-4">
          <img src={location_icon} width={24} height={24} alt="location icon" />
          <p className=" text-xl leading-[30px] font-semibold">
            {"Bangkok, Thailand"}
          </p>
        </div>
      </article>

      <section className=" grid grid-cols-2 w-full py-2 gap-y-4">
        <p className=" flex items-center">Sexual identities</p>
        <p className=" font-semibold text-gray-700">{"Male"}</p>
        <p className=" flex items-center">Sexual preferences</p>
        <p className=" font-semibold text-gray-700">{"Female"}</p>
        <p className=" flex items-center">Racial preferences</p>
        <p className=" font-semibold text-gray-700">{"Asian"}</p>
        <p className=" flex items-center">Meeting interests</p>
        <p className=" font-semibold text-gray-700">{"Friends"}</p>
      </section>

      <article className=" w-full ">
        <h2 className=" mb-4 text-2xl font-bold lead-[30px]">About me</h2>
        <p>{"I know nothing...but you"}</p>
      </article>

      <article className=" w-full">
        <h2 className=" mb-6 text-2xl font-bold lead-[30px]">
          Hobbies and Interests
        </h2>
        <div className=" flex flex-wrap gap-3">
          {hobbiesList.map((item, index) => (
            <div
              key={index}
              className=" px-4 py-2 rounded-xl border border-purple-300 text-purple-600"
            >
              {item}
            </div>
          ))}
        </div>
      </article>
    </div>
  </section>;
}

export default MatchingFilter;
