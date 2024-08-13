import { useEffect, useState } from "react";

import * as userProfilesTest from "../../assets/test-data/user-profiles-data.json";
import merryRedIcon from "../../assets/icons/user-profile-management/merry-list/merry-red-icon.png";
import merryWhiteIcon from "../../assets/icons/user-profile-management/merry-list/merry-white-icon.png";
import merryMatchIcon from "../../assets/icons/user-profile-management/merry-list/merry-match-icon.png";
import locationIcon from "../../assets/icons/user-profile-management/merry-list/location-icon.png";
import chatIcon from "../../assets/icons/user-profile-management/merry-list/chat-icon.png";
import viewIcon from "../../assets/icons/user-profile-management/merry-list/view-icon.png";
import matchIcon from "../../assets/icons/user-profile-management/merry-list/match-icon.png";
import notMatchIcon from "../../assets/icons/user-profile-management/merry-list/not-match-icon.png";
import rejectIcon from "../../assets/icons/reject-icon.png";
import loveIcon from "../../assets/icons/love-icon.png";
import nextIcon from "../../assets/icons/next-vector-icon.png";
import backIcon from "../../assets/icons/back-vector-icon.png";
import exitIcon from "../../assets/icons/cancel-icon.png";
import exitPreviewIcon from "../../assets/icons/preview-exit-icon.png";

import useProfiles from "../../hooks/use-profiles";
import { useAuth } from "../../context/auth.jsx";
import useMerryList from "../../hooks/use-merry-list.jsx";

import getAge from "../../utils/get-age.jsx";

import { useNavigate } from "react-router-dom";

function MerryListView() {
  console.log(userProfilesTest.data);
  const [currentView, setCurrentView] = useState({});
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [imageOrder, setImageOrder] = useState(0);
  const [maxImage, setMaxImage] = useState(4);

  const { state } = useAuth();

  const navigate = useNavigate();

  const user_id = state.user.user_id;
  console.log("user_id", user_id);

  const date = new Date();

  const { profile, profilesList, getProfileById, getProfiles } = useProfiles();
  const { merryList, otherCount, getMerryList, deleteMerryList } =
    useMerryList();
  console.log("merryList", merryList);

  useEffect(() => {
    const user_id = state.user.user_id;
    console.log(user_id);
    getProfiles();
    getMerryList(user_id);
  }, []);

  // console.log(profilesList);
  console.log(profile);

  console.log("profile", profile);
  console.log("currrent", currentView);

  const handleClickView = (item) => {
    setImageOrder(0);
    getProfileById(item.user_id === user_id ? item.friend_id : item.user_id);
  };

  const handleBackImage = (event) => {
    event.preventDefault();
    if (imageOrder > 0) {
      setImageOrder(imageOrder - 1);
    }
  };

  const handleNextImage = (event) => {
    event.preventDefault();
    if (imageOrder < maxImage - 1) {
      setImageOrder(imageOrder + 1);
    }
  };

  const handleClickUnmarry = (user_id, friend_id,index) => {
    deleteMerryList(user_id, friend_id,index);
    // location.reload();
  };

  console.log("max", maxImage);
  useEffect(() => {
    setCurrentView(profile);
    if (profile.images) {
      setMaxImage(profile.images.length);
    }
  }, [profile]);

  const handleClickChat = (id) => {
    navigate(`/matchingchat/${id}`);
  };

  return (
    <>
      {!isMobilePreview ? (
        <>
          <header className=" px-4 lg:px-0 py-10 lg:py-0 flex flex-col gap-10 lg:gap-6 lg:mb-10">
            <article className="">
              <h1 className=" text-sm font-semibold text-beige-700 mb-2">
                PROFILE
              </h1>
              <p className=" text-purple-500 text-[32px] leading-10 font-bold lg:text-[46px] lg:font-extrabold lg:leading-[57.5px] hidden lg:inline-block">
                Let’s know each other with Merry!
              </p>
              <p className=" text-purple-500 text-[32px] leading-10 font-bold lg:text-[46px] lg:font-extrabold lg:leading-[57.5px] lg:hidden">
                Let’s know each other
              </p>
              <p className=" text-purple-500 text-[32px] leading-10 font-bold lg:text-[46px] lg:font-extrabold lg:leading-[57.5px] lg:hidden">
                with Merry!
              </p>
            </article>
            <div className=" flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
              <div className=" flex gap-4 max-md:justify-center">
                <div className="  px-6 py-5 bg-white rounded-2xl flex flex-col gap-1 border border-gray-200">
                  <div className=" text-red-500 text-2xl leading-[30px] flex gap-1 items-center ">
                    <p>{otherCount.followerCount}</p>
                    <img src={merryRedIcon} className=" h-6 " />
                  </div>
                  <p>Merry to you</p>
                </div>
                <div className="  px-6 py-5 bg-white rounded-2xl flex flex-col gap-1 border border-gray-200">
                  <div className=" text-red-500 text-2xl leading-[30px] flex gap-1 items-center">
                    <p>{otherCount.matchCount}</p>
                    <img src={merryMatchIcon} className=" h-6" />
                  </div>

                  <p>Merry to match</p>
                </div>
              </div>
              <div className=" text-right">
                <p className=" text-gray-700">
                  Merry limit today
                  <span className=" text-red-400 ">{` ${2}/${20}`}</span>
                </p>
                <p className=" text-xs leading-[18px] text-gray-600">
                  Reset in {24 - date.getHours()}h...
                </p>
              </div>
            </div>
          </header>
          <section className=" flex flex-col gap-x-3 gap-y-6">
            {merryList.map((item, index) => {
              const friend_id =
                item.user_id === user_id ? item.friend_id : item.user_id;

              return (
                <article
                  key={index}
                  className=" border-b border-b-gray px-4 pt-4 pb-6 flex-1 flex flex-col lg:flex-row lg:justify-between"
                >
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 ">
                    <header className=" flex justify-between gap-2">
                      <div className=" w-[104px] h-[104px] lg:w-[187px] lg:h-[187px] flex justify-center items-center rounded-3xl overflow-hidden relative">
                        <img
                          className=" w-[104px] h-[104px] lg:w-[187px] lg:h-[187px] object-cover"
                          src={item.image}
                        />
                        {item.status === "match" ? (
                          <p className=" text-purple-600 bg-purple-100 pl-[10px] px-[1px] pr-[6px] rounded-tr-lg absolute left-0 bottom-0 text-xs font-medium max-lg:hidden">
                            Merry today
                          </p>
                        ) : null}
                      </div>
                      <div className=" lg:hidden flex flex-col items-end gap-6">
                        <img
                          src={
                            item.status === "match" ? matchIcon : notMatchIcon
                          }
                          className=" h-8"
                        />
                        <div className=" flex gap-3">
                          {item.status === "match" ? (
                            <button
                              className=" bg-white shadow-primary rounded-2xl w-12 h-12 flex justify-center items-center"
                              id="chat-btn"
                              onClick={() => {
                                handleClickChat(item.id);
                              }}
                            >
                              <img src={chatIcon} className=" w-6 h-6" />
                            </button>
                          ) : null}
                          <button
                            className=" bg-white shadow-primary rounded-2xl w-12 h-12 flex justify-center items-center"
                            id="view-btn"
                            onClick={() => {
                              handleClickView(item);
                              setIsMobilePreview(true);
                            }}
                          >
                            <img src={viewIcon} className=" w-6 h-6" />
                          </button>
                          <button
                            className=" bg-red-500 shadow-primary rounded-2xl w-12 h-12 flex justify-center items-center"
                            id="un-marry-btn"
                            onClick={() => {
                              handleClickUnmarry(user_id, friend_id,index);
                            }}
                          >
                            <img src={merryWhiteIcon} className=" w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    </header>
                    <div className=" text-gray-900 flex flex-col gap-2 lg:gap-6">
                      <div className=" flex gap-4 items-center">
                        <h2 className=" flex gap-2 text-2xl leading-[30px] font-bold ">
                          {item.name.split(" ")[0]}
                          <span className=" text-gray-700">
                            {getAge(item.birthdate)}
                          </span>
                        </h2>
                        <p className=" flex whitespace-nowrap gap-2 items-center text-gray-700">
                          <img src={locationIcon} className=" w-4 h-4" />
                          {`${item.city}, ${item.location}`}
                        </p>
                      </div>
                      <div className=" grid grid-cols-2 gap-y-2 gap-x-4 py-1">
                        <p className=" flex items-center">Sexual identities</p>
                        <p className=" font-semibold text-gray-700">
                          {item.sexident}
                        </p>
                        <p className=" flex items-center">Sexual preferences</p>
                        <p className=" font-semibold text-gray-700">
                          {item.sexprefer}
                        </p>
                        <p className=" flex items-center">Racial preferences</p>
                        <p className=" font-semibold text-gray-700">
                          {item.racialprefer}
                        </p>
                        <p className=" flex items-center">Meeting interests</p>
                        <p className=" font-semibold text-gray-700">
                          {item.meetprefer}
                        </p>
                      </div>
                    </div>
                  </div>

                  <aside className=" max-lg:hidden flex flex-col items-end gap-6">
                    <img
                      src={item.status === "match" ? matchIcon : notMatchIcon}
                      className=" h-8"
                    />
                    <div className=" flex gap-3">
                      {item.status === "match" ? (
                        <button
                          className=" bg-white cursor-pointer hover:shadow-primary rounded-2xl w-12 h-12 flex justify-center items-center"
                          id="chat-btn"
                          onClick={() => {
                            handleClickChat(item.id);
                          }}
                        >
                          <img src={chatIcon} className=" w-6 h-6" />
                        </button>
                      ) : null}
                      <button
                        className=" bg-white cursor-pointer hover:shadow-primary rounded-2xl w-12 h-12 flex justify-center items-center"
                        id="view-btn"
                        onClick={() => {
                          handleClickView(item);
                          document.getElementById("preview").showModal();
                        }}
                      >
                        <img src={viewIcon} className=" w-6 h-6" />
                      </button>
                      <button
                        className=" bg-red-500 cursor-pointer hover:shadow-primary rounded-2xl w-12 h-12 flex justify-center items-center"
                        id="un-marry-btn"
                        onClick={() => {
                          handleClickUnmarry(user_id, friend_id);
                        }}
                      >
                        <img src={merryWhiteIcon} className=" w-6 h-6" />
                      </button>
                    </div>
                  </aside>
                </article>
              );
            })}
          </section>

          <dialog id="preview" className="modal">
            <div className=" bg-white rounded-[32px] min-w-[1024px] max-w-[1140px] px-16 max-[1140px]:px-4 py-20 shadow-primary relative">
              <form method="dialog">
                <button
                  id="exit-preview-btn"
                  className="btn btn-lg btn-square btn-ghost absolute top-0 right-0"
                >
                  <img src={exitIcon} alt="exit icon" width={16} height={16} />
                </button>
              </form>
              <div className=" flex justify-between">
                <div className=" w-[478px] ">
                  <div className=" h-[478px] relative">
                    <img
                      src={
                        currentView.images ? currentView.images[imageOrder] : ""
                      }
                      className=" w-[478px] h-[478px] object-cover rounded-[32px]"
                      alt={"preview photo " + { imageOrder }}
                    />
                  </div>
                  <div className=" h-12 flex justify-between items-center text-gray-700 relative ">
                    <div className=" hidden justify-center absolute top-[-30px] w-full gap-6 z-10">
                      <button className=" w-[60px] h-[60px] bg-white shadow-primary rounded-2xl">
                        <img
                          src={rejectIcon}
                          width={40}
                          height={40}
                          className=" mx-auto"
                        />
                      </button>
                      <button className=" w-[60px] h-[60px] bg-white shadow-primary rounded-2xl">
                        <img
                          src={loveIcon}
                          width={50}
                          height={50}
                          className=" mx-auto"
                        />
                      </button>
                    </div>
                    <p className=" w-[72px] flex justify-center items-center">
                      {imageOrder + 1}
                      <span className=" text-gray-600">/ {maxImage}</span>
                    </p>
                    <div className=" flex">
                      <button
                        type="button"
                        id="back-preview-image-btn"
                        onClick={handleBackImage}
                        className=" w-12 h-12 rounded-xl flex justify-center items-center z-20"
                      >
                        <img
                          src={backIcon}
                          width={16}
                          height={16}
                          alt="back photo icon"
                        />
                      </button>
                      <button
                        type="button"
                        id="next-preview-image-btn"
                        onClick={handleNextImage}
                        className=" w-12 h-12 rounded-xl flex justify-center items-center z-20"
                      >
                        <img
                          src={nextIcon}
                          width={16}
                          height={16}
                          alt="next photo icon"
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div className=" w-[478px] flex flex-col gap-10 items-end text-gray-900 leading-6">
                  <article className=" w-[418px]">
                    <h1 className=" text-[46px] leading-[57.5px] font-extrabold mb-2">
                      {currentView.name}{" "}
                      <span className=" text-gray-700">
                        {getAge(currentView.birthdate)}
                      </span>
                    </h1>
                    <div className=" flex gap-4">
                      <img
                        src={locationIcon}
                        width={24}
                        height={24}
                        alt="location icon"
                      />
                      <p className=" text-xl leading-[30px] font-semibold">
                        {`${currentView.city}, ${currentView.location}`}
                      </p>
                    </div>
                  </article>

                  <section className=" grid grid-cols-2 w-[418px] leading-6 py-2 gap-y-4">
                    <p className=" flex items-center">Sexual identities</p>
                    <p className=" text-xl leading-[30px] font-semibold text-gray-700">
                      {currentView.sexident}
                    </p>
                    <p className=" flex items-center">Sexual preferences</p>
                    <p className=" text-xl leading-[30px] font-semibold text-gray-700">
                      {currentView.sexprefer}
                    </p>
                    <p className=" flex items-center">Racial preferences</p>
                    <p className=" text-xl leading-[30px] font-semibold text-gray-700">
                      {currentView.racialprefer}
                    </p>
                    <p className=" flex items-center">Meeting interests</p>
                    <p className=" text-xl leading-[30px] font-semibold text-gray-700">
                      {currentView.meetprefer}
                    </p>
                  </section>

                  <article className=" w-[418px] ">
                    <h2 className=" mb-4 text-2xl font-bold lead-[30px]">
                      About me
                    </h2>
                    <p>{currentView.aboutMe}</p>
                  </article>

                  <article className=" w-[418px]">
                    <h2 className=" mb-6 text-2xl font-bold lead-[30px]">
                      Hobbies and Interests
                    </h2>
                    <div className=" flex flex-wrap gap-3">
                      {(currentView.hobbiesList || []).map((item, index) => (
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
        </>
      ) : (
        <section>
          <div className="  ">
            <div className="relative">
              <img
                src={currentView.images ? currentView.images[imageOrder] : ""}
                className=" w-full aspect-[26/21] object-cover rounded-b-[32px]"
                alt={"preview photo " + imageOrder}
              />
              <button className=" bg-dark absolute w-12 h-12 flex justify-center items-center rounded-full top-2 left-2 shadow-primary">
                <img
                  src={exitPreviewIcon}
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
            <div className=" h-12 flex justify-between items-center relative text-gray-700 w-screen ">
              <p className=" w-[72px] flex justify-center items-center z-20">
                {imageOrder + 1}
                <span className=" text-gray-600">/ {maxImage}</span>
              </p>
              <div className=" hidden justify-center relative top-[-30px] gap-6 z-10">
                <button className=" w-[60px] h-[60px] bg-white shadow-primary rounded-2xl">
                  <img
                    src={rejectIcon}
                    width={40}
                    height={40}
                    className=" mx-auto"
                  />
                </button>
                <button className=" w-[60px] h-[60px] bg-white shadow-primary rounded-2xl">
                  <img
                    src={loveIcon}
                    width={50}
                    height={50}
                    className=" mx-auto"
                  />
                </button>
              </div>

              <div className=" flex z-20">
                <button
                  type="button"
                  id="back-preview-image-btn"
                  onClick={handleBackImage}
                  className=" w-12 h-12 rounded-xl flex justify-center items-center z-20"
                >
                  <img
                    src={backIcon}
                    width={16}
                    height={16}
                    alt="back photo icon"
                  />
                </button>
                <button
                  type="button"
                  id="next-preview-image-btn"
                  onClick={handleNextImage}
                  className=" w-12 h-12 rounded-xl flex justify-center items-center z-20"
                >
                  <img
                    src={nextIcon}
                    width={16}
                    height={16}
                    alt="next photo icon"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className=" flex justify-center">
            <div className="flex flex-col px-4 py-6 gap-6 items-center text-gray-900 leading-6">
              <article className=" w-full">
                <h1 className=" text-[46px] leading-[57.5px] font-extrabold mb-2">
                  {currentView.name}{" "}
                  <span className=" text-gray-700">{26}</span>
                </h1>
                <div className=" flex gap-4">
                  <img
                    src={locationIcon}
                    width={24}
                    height={24}
                    alt="location icon"
                  />
                  <p className=" text-xl leading-[30px] font-semibold">
                    {`${currentView.city}, ${currentView.location}`}
                  </p>
                </div>
              </article>

              <section className=" grid grid-cols-2 w-full py-2 gap-y-4">
                <p className=" flex items-center">Sexual identities</p>
                <p className=" font-semibold text-gray-700">
                  {currentView.sexident}
                </p>
                <p className=" flex items-center">Sexual preferences</p>
                <p className=" font-semibold text-gray-700">
                  {currentView.sexprefer}
                </p>
                <p className=" flex items-center">Racial preferences</p>
                <p className=" font-semibold text-gray-700">
                  {currentView.racialprefer}
                </p>
                <p className=" flex items-center">Meeting interests</p>
                <p className=" font-semibold text-gray-700">
                  {currentView.meetprefer}
                </p>
              </section>

              <article className=" w-full ">
                <h2 className=" mb-4 text-2xl font-bold lead-[30px]">
                  About me
                </h2>
                <p>{currentView.aboutMe}</p>
              </article>

              <article className=" w-full">
                <h2 className=" mb-6 text-2xl font-bold lead-[30px]">
                  Hobbies and Interests
                </h2>
                <div className=" flex flex-wrap gap-3">
                  {(currentView.hobbiesList ?? []).map((item, index) => (
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
        </section>
      )}
    </>
  );
}

export default MerryListView;
