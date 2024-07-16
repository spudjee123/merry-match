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

const MatchingPage = () => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleDiv = () => {
    setIsHidden(!isHidden);
  };

  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  return (
    <section>
      <Nav />

      {/* { Mobile, Ipad } */}
      <div className="lg:hidden bg-[#160404] h-screen overflow-x-hidden">
        <img
          src={ImgUser1}
          className="mt-[115px] object-cover w-full rounded-b-3xl z-1 relative"
        />
        <div className="h-[30%] w-full  absolute top-[46%] bg-gradient-to-t from-purple-900 to-transparent opacity-90 rounded-b-3xl z-2"></div>
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
      {/* </section> */}

      {/* { desktop } */}
      {/* <div className="max-lg:hidden bg-[#200009] w-full h-full mt-[115px] overflow-x-hidden">
          <div className="">
            <div className=" flex flex-col items-center justify-end">
              <img src={ImgUser1} className="rounded-b-3xl object-cover " />
              <div className="h-full w-full bg-gradient-to-t from-purple-900 to-transparent opacity-90 rounded-b-3xl z-10"></div>

              <div className="absolute">
                <div className="px-4 py-2">
                  <div className="flex items-center">
                    <p className="text-[40px] font-bold">Daeny 24</p>
                    <img src={SeeProfile} />
                  </div>
                  <div className="flex ">
                    <img src={location} className="w-[20px] " />
                    <p>Bangkok, Thailand</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center z-10 mt-5">
                <img
                  src={DislikeButton}
                  alt="Dislike button"
                  className="cursor-pointer h-[100px] mx-4"
                />
                <img
                  src={LikeButton}
                  alt="Like button"
                  className="cursor-pointer h-[100px] mx-4"
                />
              </div>

              <div className="w-full flex justify-center">
                <div className="w-[90%] flex items-center justify-between text-white z-20 ">
                  <p>Filter</p>
                  <p>
                    Merry limit today{" "}
                    <span className="text-[#FF1659]">2/20</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

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
              <img src={ImgUser1} />
            </div>
            <div className="bg-[#160404] p-4 rounded shadow">
              <img src={ImgUser2} />
            </div>
          </TinderCard>
        </div>

        <div className="lg:w-[20%] h-full border-2">
          <div className="flex flex-col justify-start items-center">
            <p className="text-gray-900 text-[25px]">Serch by Keywords</p>

            <form method="GET">
              <div class="relative text-gray-600 focus-within:text-gray-400">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button
                    type="submit"
                    class="p-1 focus:outline-none focus:shadow-outline"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      class="w-6 h-6"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="search"
                  name="q"
                  class="py-2 text-sm text-white rounded-md pl-10 focus:outline-none focus:bg-white border-gray-900"
                  placeholder="Search..."
                  autocomplete="off"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatchingPage;
