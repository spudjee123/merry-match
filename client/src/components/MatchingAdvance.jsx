import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import DislikeButton from "../assets/images/dislikebutton.png";
import LikeButton from "../assets/images/likebutton.png";
import richard from "../assets/images/richard.jpg";
import erlich from "../assets/images/erlich.jpg";
import monica from "../assets/images/monica.jpg";
import jared from "../assets/images/jared.jpg";
import dinesh from "../assets/images/dinesh.jpg";
import SeeProfile from "../assets/images/seeprofile.png";
import arrowleft from "../assets/images/arrowleft.png";
import arrowright from "../assets/images/arrowright.png";
import filter from "../assets/images/filter.png";
import location from "../assets/images/location.png";

import exit_icon from "../assets/icons/cancel-icon.png";
import back_icon from "../assets/icons/back-vector-icon.png";
import next_icon from "../assets/icons/next-vector-icon.png";
import location_icon from "../assets/icons/location-icon.png";
import reject_icon from "../assets/icons/reject-icon.png";
import love_icon from "../assets/icons/love-icon.png";
import preview_exit_icon from "../assets/icons/preview-exit-icon.png";

const db = [
  {
    name: "Richard Hendricks",
    url: richard,
    erlich,
  },
  {
    name: "Erlich Bachman",
    url: erlich,
    monica,
  },
  {
    name: "Monica Hall",
    url: monica,
  },
  {
    name: "Jared Dunn",
    url: jared,
  },
  {
    name: "Dinesh Chugtai",
    url: dinesh,
  },
];

function MatchingAdvanced() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const [isSecondImage, setIsSecondImage] = useState(false);
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [hobbiesList, setHobbiesList] = useState([]);
  const [hobby, setHobby] = useState("");
  const currentIndexRef = useRef(currentIndex);
  const [isHidden, setIsHidden] = useState(true);
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(80);

  const toggleDiv = () => setIsHidden(!isHidden);

  const onSwipe = (direction) => {
    console.log(`You swiped: ${direction}`);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(`${myIdentifier} left the screen`);
  };

  const handleMinAgeChange = (e) => {
    const value =
      e.target.value === "" ? 0 : Math.min(Number(e.target.value), maxAge);
    setMinAge(value);
  };

  const handleMaxAgeChange = (e) => {
    const value =
      e.target.value === "" ? 0 : Math.max(Number(e.target.value), minAge);
    setMaxAge(value);
  };

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0 && currentIndex < db.length;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = () => {
    if (currentIndex < db.length - 1) {
      const newIndex = currentIndex + 1;
      updateCurrentIndex(newIndex);
    }
  };

  const goForward = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      updateCurrentIndex(newIndex);
    }
  };

  return (
    <>
      <dialog id="SeeProfileDesktop" className="modal  w-[500px] z-10">
        <div className="modal-box w-11/12 max-w-5xl z-10">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <section>
        {/*  Mobile and iPad view */}
        <div className="flex flex-col items-center">
          <div className="lg:hidden ">
            <TinderCard
              ref={childRefs[currentIndex]}
              className="swipe"
              key={db[currentIndex].name}
              onSwipe={(dir) =>
                swiped(dir, db[currentIndex].name, currentIndex)
              }
              onCardLeftScreen={() =>
                outOfFrame(db[currentIndex].name, currentIndex)
              }
            >
              <div
                style={{ backgroundImage: `url(${db[currentIndex].url})` }}
                className="card bg-cover bg-center mt-[10%] w-screen h-screen rounded-3xl shadow-lg"
              >
                <div className="h-full w-full absolute  bg-gradient-to-t from-purple-800 to-transparent opacity-70 rounded-b-3xl z-2"></div>
                <div className="w-full h-full flex justify-center mb-10 p-4 z-40">
                  <div className="w-[90%] h-full flex flex-row items-end justify-between">
                    <div className="text-white w-full flex items-center justify-between">
                      <div className="">
                        <h className="text-[25px]">
                          {db[currentIndex].name} 24{" "}
                        </h>
                        <p className="flex flex-row text-[20px]">
                          <img
                            src={location}
                            className="mt-2 mr-2 w-[15px] h-[20px]"
                          />
                          Bangkok, Thailand
                        </p>
                      </div>
                      <button
                        className=""
                        onClick={() =>
                          document
                            .getElementById("SeeProfileMobile")
                            .showModal()
                        }
                      >
                        <img src={SeeProfile} className="w-[60px] h-[60px]" />
                      </button>
                      <dialog
                        id="SeeProfileMobile"
                        className="modal bg-white w-screen h-screen mt-[110px]"
                      >
                        <div className="w-full h-full">
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2 z-10">
                              <img
                                src={arrowleft}
                                className=" w-[16px] h-[16px]"
                              />
                            </button>
                          </form>
                          <section className="w-screen h-screen ">
                            <div
                              style={{
                                backgroundImage: `url(${db[currentIndex].url})`,
                              }}
                              className="rounded-b-3xl bg-cover bg-center w-full h-[30%] shadow-lg"
                            ></div>
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
                                  <img
                                    src={love_icon}
                                    width={50}
                                    height={50}
                                    className=" mx-auto"
                                  />
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
                                  <img
                                    src={back_icon}
                                    width={16}
                                    height={16}
                                    alt="back photo icon"
                                  />
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
                                  <img
                                    src={next_icon}
                                    width={16}
                                    height={16}
                                    alt="next photo icon"
                                  />
                                </button>
                              </div>
                            </div>
                            <div className="flex flex-col px-4 py-6 gap-6 items-center text-gray-900 leading-6">
                              <article className=" w-full">
                                <h1 className=" text-[46px] leading-[57.5px] font-extrabold mb-2">
                                  {"John Snow"}{" "}
                                  <span className=" text-gray-700">{26}</span>
                                </h1>
                                <div className=" flex gap-4">
                                  <img
                                    src={location_icon}
                                    width={24}
                                    height={24}
                                    alt="location icon"
                                  />
                                  <p className=" text-xl leading-[30px] font-semibold">
                                    {"Bangkok, Thailand"}
                                  </p>
                                </div>
                              </article>

                              <section className=" grid grid-cols-2 w-full py-2 gap-y-4">
                                <p className=" flex items-center">
                                  Sexual identities
                                </p>
                                <p className=" font-semibold text-gray-700">
                                  {"Male"}
                                </p>
                                <p className=" flex items-center">
                                  Sexual preferences
                                </p>
                                <p className=" font-semibold text-gray-700">
                                  {"Female"}
                                </p>
                                <p className=" flex items-center">
                                  Racial preferences
                                </p>
                                <p className=" font-semibold text-gray-700">
                                  {"Asian"}
                                </p>
                                <p className=" flex items-center">
                                  Meeting interests
                                </p>
                                <p className=" font-semibold text-gray-700">
                                  {"Friends"}
                                </p>
                              </section>

                              <article className=" w-full ">
                                <h2 className=" mb-4 text-2xl font-bold lead-[30px]">
                                  About me
                                </h2>
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
                          </section>
                        </div>
                      </dialog>
                    </div>
                  </div>
                </div>
              </div>
            </TinderCard>
          </div>

          {/* Desktop view */}

          <div className="cardContainer flex justify-center max-lg:hidden z-[0]">
            {currentIndex >= 0 && (
              <TinderCard
                ref={childRefs[currentIndex]}
                className="swipe"
                key={db[currentIndex].name}
                onSwipe={(dir) =>
                  swiped(dir, db[currentIndex].name, currentIndex)
                }
                onCardLeftScreen={() =>
                  outOfFrame(db[currentIndex].name, currentIndex)
                }
              >
                <div
                  style={{ backgroundImage: `url(${db[currentIndex].url})` }}
                  className="card bg-cover bg-center mt-[10%] w-[580px] h-[580px]  w-rounded-3xl shadow-lg"
                >
                  <div className="h-full w-full ">
                    s
                    <div className="h-full w-full absolute bg-gradient-to-t from-purple-800 to-transparent opacity-80 rounded-b-3xl z-2"></div>
                  </div>
                  <div className="w-full h-full flex justify-center mb-10 p-4 z-40">
                    <div className="w-[90%] h-full flex flex-row items-end justify-between">
                      <div className="text-white text-[25px] flex justify-center items-center">
                        <div className="">{db[currentIndex].name} 24</div>
                        <button
                          className=""
                          onClick={() =>
                            document
                              .getElementById("SeeProfileDesktop")
                              .showModal()
                          }
                        >
                          <img
                            src={SeeProfile}
                            className="mt-2 w-[60px] h-[60px]"
                          />
                        </button>
                      </div>

                      <div className="mb-4">
                        <button onClick={goBack}>
                          <img
                            src={arrowleft}
                            className="mr-6 w-[16px] h-[16px]"
                          />
                        </button>
                        <button onClick={goForward}>
                          <img src={arrowright} className="w-[16px] h-[16px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TinderCard>
            )}
          </div>

          <div className="buttons flex space-x-4 mt-[-55px] z-40">
            <button
              className={`p-2 rounded ${!canSwipe ? "" : ""}`}
              onClick={() => swipe("left")}
            >
              <img src={DislikeButton} alt="Dislike" />
            </button>
            <button
              className={`p-2 rounded ${!canSwipe ? "" : ""}`}
              onClick={() => swipe("right")}
            >
              <img src={LikeButton} alt="Like" />
            </button>
          </div>

          {/* bottom desktop*/}
          <p className="h-[100px] flex flex-row items-center justify-center max-lg:hidden">
            Merry limit today <span className="text-[#FF1659] ml-4">2/20</span>
          </p>

          {/* bottom mobile*/}
          <div className="w-[90%] flex items-end justify-between lg:hidden">
            <div className="flex flex-row ">
              <button
                className=""
                onClick={() => document.getElementById("Filter").showModal()}
              >
                <img src={filter} className="w-[25px] h-[25px] mr-2" />
              </button>
              Filter
            </div>
            <p className=" flex flex-row">
              Merry limit today{" "}
              <span className="text-[#FF1659] ml-4">2/20</span>
            </p>
          </div>

          {/*  Filter  modal-box*/}
          <section className="">
            <dialog
              id="Filter"
              className="modal bg-white w-screen h-[80%] flex flex-col mt-[180px] rounded-t-3xl"
            >
              <form method="dialog">
                <button className="text-[18px] text-black btn btn-sm btn-circle btn-ghost absolute left-3 top-4">
                  ✕
                </button>
                <p className="text-[20px] text-[#191C77] absolute right-[45%] top-4">
                  Filter
                </p>
                <button className="text-[16px] text-red-500 btn btn-sm btn-circle btn-ghost absolute right-6 top-4">
                  Clear
                </button>
              </form>

              {/* Search by Keywords */}
              <div className="w-full h-[20%] flex pt-24 items-start justify-center">
                <div className="w-[90%]">
                  <p className="text-black text-lg">Search by Keywords</p>
                  <form method="GET">
                    <div className="relative pt-4">
                      <span className="absolute inset-y-0 left-0 flex pt-4 pl-2">
                        <button type="submit" className="p-1 border-gray-300">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                          >
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                          </svg>
                        </button>
                      </span>
                      <input
                        type="search"
                        name="q"
                        className="py-2 w-full text-sm text-black rounded-md pl-10 bg-white border focus:border-gray-300 border-gray-300"
                        placeholder="Search..."
                        autoComplete="off"
                      />
                    </div>
                  </form>
                </div>
              </div>

              {/* Sex you interest */}
              <div className="w-full h-[20%] flex pt-24 justify-center">
                <div className="w-[90%] h-full ">
                  <p className="text-black text-lg ">Sex you interest</p>
                  {["Default", "Female", "Non-binary people"].map((label) => (
                    <div className="flex" key={label}>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox mt-4 border-gray-300 [--chkbg:purple] [--chkfg:white] checked:border-purple-300"
                      />
                      <p className="ml-4 mt-3 w-full text-lg">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Age Range */}
              <div className="w-full h-full mt-[120px] flex justify-center items-center">
                <div className="w-[90%]">
                  <p className="text-black text-lg">Age Range</p>
                  <div className="w-full mt-4 ">
                    <div className="">
                      <input
                        type="range"
                        step="1"
                        min={18}
                        max={maxAge}
                        value={minAge}
                        onChange={handleMinAgeChange}
                        className={`absolute pointer-events-auto appearance-none z-20 h-2 w-[50%] opacity-0 cursor-pointer`}
                      />
                      <input
                        type="range"
                        step="1"
                        min={minAge}
                        max={80}
                        value={maxAge}
                        onChange={handleMaxAgeChange}
                        className={`absolute pointer-events-auto appearance-none z-20 h-2 w-[50%] right-0 opacity-0 cursor-pointer`}
                      />
                      <div className="relative z-10 h-2 ">
                        <div className="absolute z-10 left-0 right-0 bottom-0 top-0 h-1 rounded-md bg-gray-200 "></div>
                        <div
                          className="absolute z-20 top-0 bottom-0 rounded-md flex h-1 bg-purple-500"
                          style={{
                            right: `${(1 - (maxAge - 18) / 80) * 100}%`,
                            left: `${((minAge - 18) / 80) * 100}%`,
                          }}
                        ></div>
                        <div
                          className="absolute z-30 w-5 h-5 top-0 left-0 bg-purple-300 border-[3px] border-purple-500 rounded-full -mt-2 -ml-1"
                          style={{
                            left: `${((minAge - 18) / 80) * 100}%`,
                          }}
                        ></div>
                        <div
                          className="absolute z-30 w-5 h-5 bg-purple-300 border-[3px] right-0 border-purple-500 rounded-full -mt-2 -mr-3"
                          style={{
                            right: `${(1 - (maxAge - 18) / 80) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-5">
                      <input
                        type="text"
                        value={minAge}
                        onChange={(e) =>
                          handleMinAgeChange({
                            target: {
                              value: Math.max(parseInt(e.target.value) || 0),
                            },
                          })
                        }
                        className="px-3 py-2 border bg-white border-gray-200 rounded-lg text-xl w-[110px] h-[60px] text-start"
                      />
                      <p className="text-black">-</p>
                      <input
                        type="text"
                        value={maxAge}
                        onChange={(e) =>
                          handleMaxAgeChange({
                            target: {
                              value: Math.min(
                                parseInt(e.target.value) || 0,
                                80
                              ),
                            },
                          })
                        }
                        className="px-3 py-2 border bg-white border-gray-200 rounded-lg text-xl w-[110px] h-[60px] text-start"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[90%] m-6 flex items-center justify-center ">
                <button className="bg-red-500 rounded-[30px] w-full h-[60px] text-xl text-white">
                  Search
                </button>
              </div>
            </dialog>
          </section>
        </div>
      </section>
    </>
  );
}

export default MatchingAdvanced;
