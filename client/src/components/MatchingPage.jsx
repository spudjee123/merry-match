import React, { useState } from "react";
import Heart from "../assets/images/heartmatchingpage.png";
import ImgUser2 from "../assets/images/mockupimguser2.png";
import ImgUser3 from "../assets/images/mockupimguser3.png";
import Avatar from "../assets/images/avatarmatchingpage.png";
import NavUser from "../pages/user-profile-management/navUser";
import Cardtinder from "./tinder/cardtinder";
import RangeSlider from "./tinder/rangeslider";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { useFilter } from "../context/profile-filter-context";

const MatchingPage = () => {
  const [matchImages, setMatchImages] = useState([]);
  const [matchName, setMatchName] = useState([]);
  const [matchInfo, setMatchInfo] = useState([]);
  const { state } = useAuth();
  const userId = state.user?.user_id;
  const navigate = useNavigate();
  const { filterParams, setFilterParams, ageRange, setAgeRange } = useFilter();
  const [keyword, setKeyword] = useState("");
  const handleSearchKeyword = (event) => {
    event.preventDefault();
    setFilterParams({ ...filterParams, keyword });
  };
  const handleTypeKeyword = (event) => {
    setKeyword(event.target.value);
  };

  const handleResetSearch = () => {
    setAgeRange([18, 80]);
    setFilterParams({});
  };

  const handleClickSearch = (event) => {
    event.preventDefault();
    setFilterParams({ minAge: ageRange[0], maxAge: ageRange[1] });
  };

  console.log("ageRange", ageRange);
  console.log("FilterParams", filterParams);

  useEffect(() => {
    // เก็บข้อมูลทุกอย่าง
    const fetchMatchImages = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4001/merry/status/${userId}`
        );
        const image = result.data.image;
        const name = result.data.name;
        const info = result.data.data;
        // console.log("abc", result);
        setMatchImages(image);
        setMatchName(name);
        setMatchInfo(info);
      } catch (error) {
        console.error("Error fetching match images:", error);
      }
    };
    fetchMatchImages();
  }, [userId]);

  // console.log(matchInfo);

  const handleClickToChatRoom = (id) => {
    navigate(`/matchingchat/${id}`);
  };

  return (
    <section>
      <NavUser />

      {/* Mobile and iPad view */}
      <div className="lg:hidden bg-[#160404] h-screen w-screen overflow-x-hidden">
        <Cardtinder />
      </div>

      {/* Desktop view */}
      <div className="bg-white w-screen h-screen mt-[70px] overflow-x-hidden flex max-lg:hidden">
        {/* Left View */}
        <div className="lg:w-[25%] border-2 flex flex-col items-center">
          <div className="lg:h-[30%] lg:w-full border-2 flex justify-center items-center cursor-pointer">
            <div className="lg:h-[80%] lg:w-[95%] lg:bg-[#F6F7FC] lg:rounded-xl lg:border lg:hover:border-purple-400 lg:flex lg:flex-col lg:justify-center lg:items-center lg:text-center">
              <img src={Heart} alt="Heart Icon" />
              <h2 className="lg:text-[#95002B] lg:text-[20px] lg:font-bold">
                Discover New Match
              </h2>
              <p className="lg:text-[#646D89] lg:text-[12px]">
                Start finding and connect with new friends!
              </p>
            </div>
          </div>
          <div
            id="match-container"
            className="lg:h-[25%] lg:w-full border-2 lg:flex lg:justify-center lg:items-center"
          >
            <div className="lg:w-[95%]">
              <h2 className="lg:text-[#2A2E3F] lg:font-semibold">
                Merry Match!
              </h2>
              <div className="lg:flex lg:gap-5 lg:mt-[10px] overflow-x-auto overflow-y-auto max-h-[400px] max-w-[800px] cursor-pointer">
                {matchImages.map((item, index) => {
                  return (
                    <img
                      key={index}
                      className="h-[100px] w-[100px] rounded-[24px]"
                      src={item}
                      alt="img_user"
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="lg:h-[45%] lg:w-full border-2 lg:flex lg:justify-center lg:items-start">
            <div className="lg:w-[95%] lg:mt-[25px]">
              <h2 className="lg:text-[#2A2E3F] lg:font-semibold">
                Chat with Merry Match
              </h2>
              {matchInfo.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="lg:flex lg:mt-[15px] lg:gap-5 cursor-pointer active:border active:border-purple-500 hover:bg-gray-100 p-2 rounded-xl"
                    onClick={() => {
                      handleClickToChatRoom(item.id);
                    }}
                  >
                    <img
                      className="h-[60px] w-[60px] rounded-[40px]"
                      src={item.image}
                      alt="user_chat"
                    />
                    <div>
                      <h1 className="lg:text-[16px] lg:text-[#2A2E3F]">
                        {item.name}
                      </h1>
                      <p className="lg:text-[12px] lg:text-[#646D89]">
                        You know nothing {item.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Middle View */}
        <div className="lg:w-[55%] bg-[#160404]">
          <Cardtinder />
        </div>

        {/* Right View */}
        <div className="flex flex-col w-[20%] border-2">
          {/* Search by Keywords */}
          <div className="flex flex-col p-4">
            <p className="text-black text-lg">Search by Keywords</p>
            <form method="GET" onSubmit={handleSearchKeyword}>
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
                  value={keyword}
                  onChange={handleTypeKeyword}
                />
              </div>
            </form>
          </div>

          {/* Sex you interest */}
          <div className="mt-[25%]">
            <p className="text-black text-lg ml-4">Sex you interest</p>
            {["Default", "Female", "Non-binary people"].map((label) => (
              <div className="flex" key={label}>
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox ml-4 mt-4 border-gray-300 [--chkbg:purple] [--chkfg:white] checked:border-purple-300"
                  onChange={(event) => {
                    console.log("event", event.target.checked);
                  }}
                />
                <p className="ml-4 mt-3 w-full text-lg">{label}</p>
              </div>
            ))}
          </div>

          {/* Age Range */}
          <div className="mt-[25%]">
            <p className="text-black text-lg ml-3">Age Range</p>
            <div className="flex justify-center">
              <RangeSlider />
            </div>
          </div>
          <div className="flex m-6 justify-between">
            <button
              onClick={handleResetSearch}
              className="text-red-500 w-[130px] h-[60px] text-xl mr-4"
            >
              Clear
            </button>
            <button
              onClick={handleClickSearch}
              className="bg-red-500 rounded-t-[30px] rounded-b-[30px] w-[130px] h-[60px] text-xl text-white"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatchingPage;
