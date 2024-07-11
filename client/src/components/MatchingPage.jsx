import React, { useState } from "react";
import ImgUser1 from "../assets/images/mockupimguser1.png";
import LikeButton from "../assets/images/likebutton.png";
import DislikeButton from "../assets/images/dislikebutton.png";
import SeeProfile from "../assets/images/seeprofile.png";
import Heart from "../assets/images/heartmatchingpage.png";
import ImgUser2 from "../assets/images/mockupimguser2.png";
import ImgUser3 from "../assets/images/mockupimguser3.png";
import Avatar from "../assets/images/avatarmatchingpage.png";
import TinderCard from "react-tinder-card";

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
    <section className="bg-[#200009] w-screen h-screen">
      <div className="w-screen h-screen relative lg:hidden">
        <div className="absolute">
          <img src={ImgUser1} alt="" className="h-[700px] rounded-b-3xl" />
          <div className="absolute bottom-0 left-0 w-full h-[250px]">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-purple-900 to-transparent opacity-90 rounded-b-3xl"></div>
          </div>
        </div>
        <div className="absolute top-[520px] left-0 right-0 bottom-0">
          <div className="px-4 py-2">
            <div className="flex flex-col mx-auto w-[90%] text-white">
              <div className="flex items-center justify-between">
                <div className="text-[40px] font-bold">Daeny 24</div>
                <div>
                  <img src={SeeProfile} alt="See profile" />
                </div>
              </div>
              <div>Bangkok, Thailand</div>
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
          <div className="flex justify-between w-[90%] text-white absolute z-20 bottom-[20px] left-[20px]">
            <div>Filter</div>
            <div>
              Merry limit today <span className="text-[#FF1659]">2/20</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:bg-white lg:h-full lg:w-full lg:flex">
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

        <div className="lg:w-[55%] border-2 flex justify-center items-center">
          <TinderCard
            onSwipe={onSwipe}
            onCardLeftScreen={() => onCardLeftScreen("fooBar")}
            preventSwipe={["right", "left"]}
          >
            <div className="bg-white p-4 rounded shadow">Hello, World!</div>
          </TinderCard>
        </div>

        <div className="lg:w-[20%] border-2"></div>
      </div>
    </section>
  );
};

export default MatchingPage;
