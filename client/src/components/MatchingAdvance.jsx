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
    <div className="flex flex-col items-center">
      <div className="cardContainer flex justify-center">
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
              className="card bg-cover bg-center mt-[10%] w-[650px] h-[650px] rounded-3xl shadow-lg "
            >
              <div className="h-full w-full ">
                <div className="h-full w-full absolute bg-gradient-to-t from-purple-800 to-transparent opacity-80 rounded-b-3xl z-2"></div>
              </div>
              <div className="w-full h-full flex justify-center mb-10 p-4 z-40">
                <div className="w-[90%] h-full flex flex-row items-end justify-between">
                  <h3 className="text-white text-[25px] flex justify-center items-center">
                    <div className="">{db[currentIndex].name} 24</div>
                    <button className="mt-2">
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
      {/* {lastDirection && (
        <h2 className="infoText mt-4 text-lg">You swiped {lastDirection}</h2>
      )} */}
      <p className="h-[100px] flex flex-row items-center justify-center">
        Merry limit today <span className="text-[#FF1659] ml-4">2/20</span>
      </p>
    </div>
  );
}

export default MatchingAdvanced;
