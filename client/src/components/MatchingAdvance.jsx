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
    /* Mobile and iPad view */
    <div className="flex flex-col items-center">
      <div className="lg:hidden ">
        <TinderCard
          ref={childRefs[currentIndex]}
          className="swipe"
          key={db[currentIndex].name}
          onSwipe={(dir) => swiped(dir, db[currentIndex].name, currentIndex)}
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
                    <h className="text-[25px]">{db[currentIndex].name} 24 </h>
                    <p className="flex flex-row text-[20px]">
                      <img
                        src={location}
                        className="mt-2 mr-2 w-[15px] h-[20px]"
                      />
                      Bangkok, Thailand
                    </p>
                  </div>

                  <button className="mt-2"></button>
                  <button
                    className=""
                    onClick={() =>
                      document.getElementById("SeeProfileMobile").showModal()
                    }
                  >
                    <img src={SeeProfile} className="w-[60px] h-[60px]" />
                  </button>
                  <dialog id="SeeProfileMobile" className="modal">
                    <div className="w-screen h-screen flex justify-center items-center">
                      <div className="bg-white rounded-[32px] w-[80%] h-[80%] px-12 py-10 shadow-primary relative ">
                        <div className="relative flex justify-center items-center h-full">
                          <img
                            style={{
                              backgroundImage: `url(${db[currentIndex].url})`,
                            }}
                            className="w-[450px] h-[400px]"
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
                        <div className=" h-12 flex justify-between items-center absolute text-gray-700 ">
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
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>
          </div>
        </TinderCard>
      </div>

      {/* Desktop view */}
      <div className="cardContainer flex justify-center max-lg:hidden">
        {currentIndex >= 0 && (
          <TinderCard
            ref={childRefs[currentIndex]}
            className="swipe"
            key={db[currentIndex].name}
            onSwipe={(dir) => swiped(dir, db[currentIndex].name, currentIndex)}
            onCardLeftScreen={() =>
              outOfFrame(db[currentIndex].name, currentIndex)
            }
          >
            <div
              style={{ backgroundImage: `url(${db[currentIndex].url})` }}
              className="card bg-cover bg-center mt-[10%] w-[650px] h-[650px] rounded-3xl shadow-lg"
            >
              <div className="h-full w-full ">
                <div className="h-full w-full absolute bg-gradient-to-t from-purple-800 to-transparent opacity-80 rounded-b-3xl z-2"></div>
              </div>
              <div className="w-full h-full flex justify-center mb-10 p-4 z-40">
                <div className="w-[90%] h-full flex flex-row items-end justify-between">
                  <h3 className="text-white text-[25px] flex justify-center items-center">
                    <div className="">{db[currentIndex].name} 24</div>
                    {/* <button className="mt-2"></button> */}
                    <button
                      className="mt-2"
                      onClick={() =>
                        document.getElementById("SeeProfileDesktop").showModal()
                      }
                    >
                      <img src={SeeProfile} className="w-[60px] h-[60px]" />
                    </button>
                  </h3>
                  <div className="mb-4">
                    <button onClick={goBack}>
                      <img src={arrowleft} className="mr-6 w-[16px] h-[16px]" />
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
        <p className="flex flex-row ">
          <button
            className=""
            onClick={() => document.getElementById("Filter").showModal()}
          >
            <img src={filter} className="w-[25px] h-[25px] mr-2" />
          </button>
          <dialog id="Filter" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
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
          Filter
        </p>
        <p className=" flex flex-row">
          Merry limit today <span className="text-[#FF1659] ml-4">2/20</span>
        </p>
      </div>
    </div>
  );
}

export default MatchingAdvanced;
