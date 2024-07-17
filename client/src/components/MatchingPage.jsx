import React, { useState } from "react";
import ImgUser1 from "../assets/images/mockupimguser1.png";
import LikeButton from "../assets/images/likebutton.png";
import DislikeButton from "../assets/images/dislikebutton.png";
import SeeProfile from "../assets/images/seeprofile.png";
import Heart from "../assets/images/heartmatchingpage.png";
import ImgUser2 from "../assets/images/mockupimguser2.png";
import ImgUser3 from "../assets/images/mockupimguser3.png";
import Avatar from "../assets/images/avatarmatchingpage.png";
import location from "../assets/images/location.png";
import filter from "../assets/images/filter.png";
import TinderCard from "react-tinder-card";
import Nav from "../pages/non-user/nav";
import MatchingAdvanced from "./MatchingAdvance";

const MatchingPage = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const min = 0;
  const max = 100;

  const toggleDiv = () => {
    setIsHidden(!isHidden);
  };

  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  const handleMinPriceChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice);
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice);
    setMaxPrice(value);
  };

  return (
    <section>
      <Nav />

      {/* Mobile and iPad view */}
      <div className="lg:hidden bg-[#160404] h-screen overflow-x-hidden">
        <img
          src={ImgUser1}
          className="mt-[115px] object-cover w-full rounded-b-3xl z-1 relative"
        />
        <div className="h-[30%] w-full absolute top-[46%] bg-gradient-to-t from-purple-900 to-transparent opacity-90 rounded-b-3xl z-2"></div>
        <div className="absolute z-10 top-[65%] w-full flex flex-col items-center">
          <div className="w-[90%] flex justify-between">
            <p className="text-[45px] text-white ">Daeny 24</p>
            <img src={SeeProfile} className="w-[60px] h-[60px] mt-2" />
          </div>
          <div className="w-[90%] flex ">
            <img src={location} className="mt-[6px] w-[15px] h-[20px]" />
            <p className="text-[20px] ml-2 text-[#D6D9E4]">Bangkok, Thailand</p>
          </div>
          <div className="flex">
            <button>
              <img src={DislikeButton} className="cursor-pointer" />
            </button>
            <button>
              <img src={LikeButton} className="cursor-pointer" />
            </button>
          </div>
          <div className="mt-[15%] w-[90%] flex justify-between">
            <div className="flex">
              <img src={filter} className="w-[25px]" />
              <p className="ml-2 text-[#D6D9E4]">Filter</p>
            </div>
            <p>
              Merry limit today <span className="text-[#FF1659]">2/20</span>
            </p>
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="bg-white mt-[115px] flex max-lg:hidden">
        <div className="lg:w-[25%] border-2">
          <div className="lg:h-[30%] lg:w-full border-2 flex justify-center items-center">
            <div className="lg:h-[80%] lg:w-[95%] lg:bg-[#F6F7FC] lg:rounded-xl lg:border lg:border-[#A62D82] lg:flex lg:flex-col lg:justify-center lg:items-center lg:text-center">
              <div>
                <img src={Heart} alt="" />
              </div>
              <div className="lg:w-[90%] lg:mb-[10px]">
                <h2 className="lg:text-[#95002B] lg:text-[20px] lg:font-bold">
                  Discover New Match
                </h2>
              </div>
              <div className="lg:w-[80%]">
                <p className="lg:text-[#646D89] lg:text-[12px]">
                  Start find and Merry to get know
                </p>
                <p className="lg:text-[#646D89] lg:text-[12px]">
                  and connect with new friend!
                </p>
              </div>
            </div>
          </div>
          <div className="lg:h-[25%] lg:w-full border-2 lg:flex lg:justify-center lg:items-center">
            <div className="lg:w-[95%]">
              <div>
                <h2 className="lg:text-[#2A2E3F] lg:font-semibold">
                  Merry Match!
                </h2>
              </div>
              <div className="lg:flex lg:gap-5 lg:mt-[10px]">
                <div>
                  <img src={ImgUser2} alt="ImgUser2" />
                </div>
                <div>
                  <img src={ImgUser3} alt="ImgUser3" />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:h-[45%] lg:w-full border-2 lg:flex lg:justify-center lg:items-start">
            <div className="lg:w-[95%]">
              <div className="lg:mt-[25px]">
                <h2 className="lg:text-[#2A2E3F] lg:font-semibold">
                  Chat with Merry Match
                </h2>
              </div>
              <div className="lg:flex lg:mt-[15px] lg:gap-5">
                <div>
                  <img src={Avatar} alt="" />
                </div>
                <div>
                  <div>
                    <h1 className="lg:text-[16px] lg:text-[#2A2E3F]">
                      Ygritte
                    </h1>
                  </div>
                  <div>
                    <p className="lg:text-[12px] lg:text-[#646D89]">
                      You know nothing Jon Snow
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[55%] bg-[#160404] border-2 flex justify-center items-center">
          <TinderCard
            onSwipe={onSwipe}
            onCardLeftScreen={() => onCardLeftScreen("fooBar")}
            preventSwipe={["right", "left"]}
          >
            <div className="bg-[#160404] p-4 rounded shadow">
              <img src={ImgUser1} alt="User1" />
            </div>
            <div className="bg-[#160404] p-4 rounded shadow">
              <img src={ImgUser2} alt="User2" />
            </div>
          </TinderCard>
        </div>

        <div className="flex flex-col w-[20%]">
          <div className="w-full h-[70%] border-2">
            <div className="flex flex-col p-4">
              <p className="text-black text-lg flex justify-start">
                Search by Keywords
              </p>

              <form method="GET">
                <div className="relative pt-4">
                  <span className="absolute inset-y-0 left-0 flex pt-4 pl-2">
                    <button
                      type="submit"
                      className="p-1 focus:border-gray-300 border-gray-300"
                    >
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
            <div className="mt-[25%]">
              <p className="text-black text-lg ml-4">Sex you interest</p>
              <div className="flex">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox ml-4 mt-4 border-gray-300 [--chkbg:purple] [--chkfg:white] checked:border-purple-300"
                />
                <p className="ml-4 mt-3 w-full text-lg">Default</p>
              </div>
              <div className="flex">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox ml-4 mt-4 border-gray-300 [--chkbg:purple] [--chkfg:white] checked:border-purple-300"
                />
                <p className="ml-4 mt-3 w-full text-lg">Female</p>
              </div>
              <div className="flex">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox ml-4 mt-4 border-gray-300 [--chkbg:purple] [--chkfg:white] checked:border-purple-300"
                />
                <p className="ml-4 mt-3 w-full text-lg">Non-binary people</p>
              </div>
            </div>
            <div className="mt-[25%]">
              <p className="text-black text-lg ml-4">Age Range</p>
              <div className="relative w-[90%] mt-4 ml-4">
                <div>
                  <input
                    type="range"
                    step="1"
                    min={min}
                    max={max}
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="absolute pointer-events-auto appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
                  />
                  <input
                    type="range"
                    step="1"
                    min={min}
                    max={max}
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="absolute pointer-events-auto appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
                  />
                  <div className="relative z-10 h-2 ">
                    <div className="absolute z-10 left-0 right-0 bottom-0 top-0 h-1 rounded-md bg-gray-200 "></div>
                    <div
                      className="absolute z-20 top-0 bottom-0 rounded-md flex h-1 bg-purple-500"
                      style={{
                        right: `${(1 - (maxPrice - min) / (max - min)) * 100}%`,
                        left: `${((minPrice - min) / (max - min)) * 100}%`,
                      }}
                    ></div>
                    <div
                      className="absolute z-30 w-5 h-5 top-0 left-0 bg-purple-300 border-[3px] border-purple-500 rounded-full -mt-2 -ml-1"
                      style={{
                        left: `${((minPrice - min) / (max - min)) * 100}%`,
                      }}
                    ></div>
                    <div
                      className="absolute z-30 w-5 h-5 top-0 right-0 bg-purple-300 border-[3px] border-purple-500 rounded-full -mt-2 -mr-3"
                      style={{
                        right: `${(1 - (maxPrice - min) / (max - min)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-5">
                  <div>
                    <input
                      type="text"
                      value={minPrice}
                      onChange={(e) =>
                        handleMinPriceChange({
                          target: { value: parseInt(e.target.value) },
                        })
                      }
                      className="px-3 py-2 border bg-white border-gray-200 rounded-lg text-xl w-[110px] h-[60px] text-start"
                    />
                  </div>
                  <p className="text-black">-</p>
                  <div className="">
                    <input
                      type="text"
                      maxLength="5"
                      value={maxPrice}
                      onChange={(e) =>
                        handleMaxPriceChange({
                          target: { value: parseInt(e.target.value) },
                        })
                      }
                      className="px-3 py-2 border bg-white border-gray-200 rounded-lg text-xl w-[110px] h-[60px] text-start"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex m-6 justify-between">
            <button className="text-red-500 w-[130px] h-[60px] text-xl mr-4">
              Clear
            </button>
            <button className="bg-red-500 rounded-t-[30px] rounded-b-[30px] w-[130px] h-[60px] text-xl text-white">
              Search
            </button>
          </div>
        </div>
      </div>
      {/* <MatchingAdvanced /> */}
    </section>
  );
};

export default MatchingPage;
