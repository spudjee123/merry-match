import React, { useState, useMemo, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";
import DislikeButton from "../../assets/images/dislikebutton.png";
import LikeButton from "../../assets/images/likebutton.png";
import arrowleft from "../../assets/images/arrowleft.png";
import arrowright from "../../assets/images/arrowright.png";
import location from "../../assets/images/location.png";
import filter from "../../assets/images/filter.png";
import SeeProfile from "./seeprofile";
import RangeSlider from "./rangeslider";
import axios from "axios";
import { useAuth } from "../../context/auth";

function Cardtinder() {
  const [swipeCount, setSwipeCount] = useState(20);
  const [userData, setUserData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentUser, setCurrentUser] = useState({ name: "", user_id: "" });
  const currentIndexRef = useRef(currentIndex);
  const { state } = useAuth();
  const userId = state.user?.user_id;
  console.log(state);

  console.log("userData", userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4001/profiles/available/${userId}`
        );
        const users = result.data.data.map((user) => ({
          user_id: user.user_id,
          name: user.name,
          url: user.image,
        }));
        setUserData(users);
        setCurrentIndex(users.length - 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //  ตอนที่ปัดไปปัดมา จะจำข้อมูลuserไว้ ทำให้ปัดปุ๊บมาปั๊บ
  const childRefs = useMemo(
    () =>
      Array(userData.length)
        .fill(0)
        .map(() => React.createRef()),
    // สร้างrefใหม่ในเเต่ละการ์ด ว่าข้อมูลการ์ดนี้ของคนนี้
    [userData.length]
  );
  // ตอนปัดการ์ด จะให้มีการอัพเดตindexก็คือค่าval
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
    // .current เข้าถึงการ์ดที่อยู่ในตำแหน่ง currentIndex
  };
  // หลังจากปัดให้ลด CurrentIndex เพื่อไปการ์ดถัดไป
  const swiped = (direction, nameToDelete, index) => {
    // ตรงนี้ปัดแล้ว merry ลด
    setSwipeCount((prevCount) => prevCount - 1);
    if (index === 0) {
      updateCurrentIndex(userData.length - 1); // ตรงนี้ไปใบสุดท้าย
    } else {
      updateCurrentIndex(index - 1);
    }
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log("currentIndex", currentIndex);
    console.log("currnetUser", userData[currentIndex - 1]);
    if (currentIndex >= 0 && currentIndex < userData.length) {
      setCurrentUser(userData[currentIndex - 1]);
    }
  };

  const canSwipe = currentIndex >= 0 && currentIndex < userData.length;
  // ค่าdir คือทิศทางการปัด
  const swipe = async (dir) => {
    if (canSwipe) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };
  //ตรงลูกศร กลับไปการ์ดเเรก
  const goBack = () => {
    if (currentIndex === userData.length - 1) {
      updateCurrentIndex(0);
    } else {
      const newIndex = currentIndex + 1;
      updateCurrentIndex(newIndex);
    }
  };
  //ตรงลูกศร ปัดไปการ์ดสุดท้าย
  const goForward = () => {
    if (currentIndex === 0) {
      updateCurrentIndex(userData.length - 1);
    } else {
      const newIndex = currentIndex - 1;
      updateCurrentIndex(newIndex);
    }
  };

  const matchUser = async () => {
    if (currentIndex >= 0 && currentIndex < userData.length) {
      console.log("current profile", userData[currentIndex]);
      const userMatch = {
        user_id: userId,
        friend_id: userData[currentIndex].user_id,
      };

      console.log(userMatch.user_id);
      console.log(userMatch.friend_id);
      try {
        await axios.post("http://localhost:4001/merry/match", userMatch);
      } catch (error) {
        alert("Error to match user", error);
      }
    }
  };

  return (
    <section>
      {/* Mobile and iPad view */}
      <div className="flex flex-col items-center">
        <div className="lg:hidden ">
          {currentIndex >= 0 && (
            <TinderCard
              ref={childRefs[currentIndex]}
              className="swipe"
              key={userData[currentIndex].name}
              onSwipe={(dir) =>
                swiped(dir, userData[currentIndex].name, currentIndex)
              }
              onCardLeftScreen={() =>
                onCardLeftScreen(userData[currentIndex].name)
              }
            >
              <div
                style={{
                  backgroundImage: `url(${userData[currentIndex].url})`,
                }}
                className="card bg-cover bg-center mt-[10%] w-screen h-screen rounded-3xl shadow-lg"
              >
                <div className="h-full w-full absolute bg-gradient-to-t from-purple-800 to-transparent opacity-70 rounded-b-3xl z-2"></div>
                <div className="w-full h-full flex justify-center mb-10 p-4 z-40">
                  <div className="w-[90%] h-full flex flex-row items-end justify-between">
                    <div className="text-white w-full flex items-center justify-between">
                      <div className="">
                        <h1 className="text-[25px]">
                          {userData[currentIndex].name} 24
                        </h1>
                        <p className="flex flex-row text-[20px]">
                          <img
                            src={location}
                            className="mt-2 mr-2 w-[15px] h-[20px]"
                            alt="Location icon"
                          />
                          Bangkok, Thailand
                        </p>
                      </div>
                      <SeeProfile user_id={userData[currentIndex].user_id} />
                    </div>
                  </div>
                </div>
              </div>
            </TinderCard>
          )}
        </div>

        {/* Desktop view */}
        <div className="cardContainer flex justify-center max-lg:hidden z-10">
          {currentIndex >= 0 && (
            <TinderCard
              ref={childRefs[currentIndex]}
              className="swipe"
              key={userData[currentIndex].name}
              onSwipe={(dir) =>
                swiped(dir, userData[currentIndex].name, currentIndex)
              }
              onCardLeftScreen={() =>
                onCardLeftScreen(userData[currentIndex].name)
              }
            >
              <div className="h-full w-full absolute bg-gradient-to-t from-purple-800 to-transparent opacity-80 rounded-b-3xl z-20"></div>
              <div
                style={{
                  backgroundImage: `url(${userData[currentIndex].url})`,
                }}
                className="bg-cover mt-[15%] w-[580px] h-[580px] rounded-3xl relative"
              >
                <div className="w-full h-full flex justify-center absolute p-4 pb-10 z-40">
                  <div className="w-[90%] h-full flex flex-row items-end justify-between">
                    <div className="text-white text-[25px] flex justify-center items-center">
                      <div className="">{userData[currentIndex].name} 24</div>
                      <SeeProfile user_id={userData[currentIndex].user_id} />
                    </div>
                    <div className="mb-6">
                      <button onClick={goBack}>
                        <img
                          src={arrowleft}
                          className="mr-6 w-[16px] h-[16px]"
                          alt="Previous"
                        />
                      </button>
                      <button onClick={goForward}>
                        <img
                          src={arrowright}
                          className="w-[16px] h-[16px]"
                          alt="Next"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TinderCard>
          )}
        </div>

        <div className="space-x-4 mt-[-55px] z-40 ">
          <button
            className={`p-2 cursor-pointer  ${!canSwipe ? "" : ""}`}
            onClick={() => swipe("left")}
          >
            <img src={DislikeButton} alt="Dislike" />
          </button>
          <button className={`p-2  ${!canSwipe ? "" : ""}`} onClick={matchUser}>
            <img src={LikeButton} alt="Like" />
          </button>
        </div>

        {/* Bottom desktop */}
        <p className="h-[100px] flex flex-row items-center justify-center max-lg:hidden">
          Merry limit today{" "}
          <span className="text-[#FF1659] ml-4">{swipeCount}/20</span>
        </p>

        {/* Bottom mobile */}
        <div className="w-[90%] flex items-end justify-between lg:hidden">
          <div className="flex flex-row">
            <button
              className=""
              onClick={() => document.getElementById("Filter").showModal()}
            >
              <img
                src={filter}
                className="w-[25px] h-[25px] mr-2"
                alt="Filter"
              />
            </button>
            Filter
          </div>
          <p className="flex flex-row">
            Merry limit today{" "}
            <span className="text-[#FF1659] ml-4">{swipeCount}/20</span>
          </p>
        </div>

        {/* Filter modal-box */}
        <section className="">
          <dialog
            id="Filter"
            className="modal bg-white w-screen h-[80%] flex flex-col mt-[180px] rounded-t-3xl "
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
              <div className="w-[90%] h-full">
                <p className="text-black text-lg">Sex you interest</p>
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
            <div className="mt-[30%] w-[95%]">
              <p className="text-black text-lg ml-3">Age Range</p>
              <div className="flex justify-center">
                <RangeSlider />
              </div>
            </div>
            <div className="w-[90%] m-6 flex items-center justify-center">
              <button className="bg-red-500 rounded-[30px] w-full h-[60px] text-xl text-white">
                Search
              </button>
            </div>
          </dialog>
        </section>
      </div>
    </section>
  );
}

export default Cardtinder;
