import React, { useState, useEffect } from "react";
import SeeProfileImage from "../../assets/images/seeprofile.png";
import reject_icon from "../../assets/icons/reject-icon.png";
import love_icon from "../../assets/icons/love-icon.png";
import arrowleft from "../../assets/images/arrowleft.png";
import back_icon from "../../assets/icons/back-vector-icon.png";
import next_icon from "../../assets/icons/next-vector-icon.png";
import location_icon from "../../assets/icons/location-icon.png";
import getAge from "../../utils/get-age";
import useUsers from "../../hooks/use-users";

function SeeProfile({ user_id }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imgProfile, setImgProfile] = useState(""); // เพิ่ม state สำหรับจัดการรูปภาพโปรไฟล์
  const { userInfo: profile, getUser, isLoading, isError } = useUsers();

  useEffect(() => {
    if (user_id) {
      getUser(user_id);
    }
  }, [user_id]);

  useEffect(() => {
    if (profile && profile.images) {
      setCurrentImageIndex(0); // รีเซ็ตค่าภาพที่จะโชว์เมื่อ user_id เปลี่ยน
      setImgProfile(profile.images[0]); // แสดงภาพแรกของโปรไฟล์
    }
  }, [profile]); // อัปเดต imgProfile เมื่อ profile เปลี่ยน

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !profile) {
    return <p>Error loading profile.</p>;
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === profile.images.length - 1 ? 0 : prevIndex + 1
    );
    setImgProfile(
      profile.images[
        currentImageIndex === profile.images.length - 1
          ? 0
          : currentImageIndex + 1
      ]
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? profile.images.length - 1 : prevIndex - 1
    );
    setImgProfile(
      profile.images[
        currentImageIndex === 0
          ? profile.images.length - 1
          : currentImageIndex - 1
      ]
    );
  };

  return (
    <section>
      {/* Mobile and iPad view */}
      <div className="lg:hidden overflow-x-hidden">
        <button
          onClick={() =>
            document.getElementById("SeeProfileMobile").showModal()
          }
        >
          <img
            src={SeeProfileImage}
            className="w-[60px] h-[60px]"
            alt="See Profile"
          />
        </button>
        <dialog
          id="SeeProfileMobile"
          className="modal bg-white w-screen h-screen mt-[0px] "
        >
          <div className="w-full h-full">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2 z-10">
                <img
                  src={arrowleft}
                  className=" w-[16px] h-[16px]"
                  alt="Back"
                />
              </button>
            </form>
            <section className="w-screen h-screen ">
              <div
                style={{
                  backgroundImage: `url(${imgProfile})`,
                }}
                className="rounded-b-3xl bg-cover bg-center w-full h-[30%] shadow-lg"
              ></div>
              <div className="h-12 flex justify-between items-center relative text-gray-700">
                <div className="flex justify-center absolute top-[-30px] w-full gap-6 z-10">
                  <button className="w-[60px] h-[60px] bg-white shadow-primary rounded-2xl">
                    <img
                      src={reject_icon}
                      width={40}
                      height={40}
                      className="mx-auto"
                      alt="Reject"
                    />
                  </button>
                  <button className="w-[60px] h-[60px] bg-white shadow-primary rounded-2xl">
                    <img
                      src={love_icon}
                      width={50}
                      height={50}
                      className="mx-auto"
                      alt="Love"
                    />
                  </button>
                </div>
                <p className="w-[72px] flex justify-center items-center z-20">
                  {currentImageIndex + 1}/{profile.images.length}
                </p>
                <div className="flex z-20">
                  <button
                    type="button"
                    id="back-preview-image-btn"
                    onClick={handlePreviousImage}
                    className="w-12 h-12 rounded-xl flex justify-center items-center"
                  >
                    <img src={back_icon} width={16} height={16} alt="Back" />
                  </button>
                  <button
                    type="button"
                    id="next-preview-image-btn"
                    onClick={handleNextImage}
                    className="w-12 h-12 rounded-xl flex justify-center items-center"
                  >
                    <img src={next_icon} width={16} height={16} alt="Next" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col px-4 py-6 gap-6 items-center text-gray-900 leading-6">
                <article className="w-full">
                  <h1 className="text-[46px] leading-[57.5px] font-extrabold mb-2">
                    {profile.name}{" "}
                    <span className="text-gray-700">
                      {getAge(profile.birthdate)}
                    </span>
                  </h1>
                  <div className="flex gap-4">
                    <img
                      src={location_icon}
                      width={24}
                      height={24}
                      alt="Location"
                    />
                    <p className="text-xl leading-[30px] font-semibold">
                      {profile.city}, {profile.location}
                    </p>
                  </div>
                </article>

                <section className="grid grid-cols-2 w-full py-2 gap-y-4">
                  <p className="flex items-center">Sexual identities</p>
                  <p className="font-semibold text-gray-700">
                    {profile.sexident}
                  </p>
                  <p className="flex items-center">Sexual preferences</p>
                  <p className="font-semibold text-gray-700">
                    {profile.sexprefer}
                  </p>
                  <p className="flex items-center">Racial preferences</p>
                  <p className="font-semibold text-gray-700">
                    {profile.racialprefer}
                  </p>
                  <p className="flex items-center">Meeting interests</p>
                  <p className="font-semibold text-gray-700">
                    {profile.meetprefer}
                  </p>
                </section>

                <article className="w-full">
                  <h2 className="mb-4 text-2xl font-bold lead-[30px]">
                    About me
                  </h2>
                  <p>{profile.aboutMe || "I know nothing...but you"}</p>
                </article>

                <article className="w-full">
                  <h2 className="mb-6 text-2xl font-bold lead-[30px]">
                    Hobbies and Interests
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {profile.hobbiesList?.map((item, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 rounded-xl border border-purple-300 text-purple-600"
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

      {/* Desktop view */}
      <div className="max-lg:hidden overflow-x-hidden">
        <button
          onClick={() =>
            document.getElementById("SeeProfileDesktop").showModal()
          }
        >
          <img
            src={SeeProfileImage}
            className="w-[60px] h-[60px] mt-4"
            alt="See Profile"
          />
        </button>
        <dialog
          id="SeeProfileDesktop"
          className="modal bg-black h-[500px] w-[500px]"
        >
          <div className="w-full h-full">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2 z-10">
                <img
                  src={arrowleft}
                  className=" w-[16px] h-[16px]"
                  alt="Back"
                />
              </button>
            </form>
            <section className="w-screen h-screen">
              <div
                style={{
                  backgroundImage: `url(${imgProfile})`,
                }}
                className="rounded-b-3xl bg-cover bg-center w-full h-[30%] shadow-lg"
              ></div>
              <div className="h-12 flex justify-between items-center relative text-gray-700">
                <div className="flex justify-center absolute top-[-30px] w-full gap-6 z-10">
                  <button className="w-[60px] h-[60px] bg-white shadow-primary rounded-2xl">
                    <img
                      src={reject_icon}
                      width={40}
                      height={40}
                      className="mx-auto"
                      alt="Reject"
                    />
                  </button>
                  <button className="w-[60px] h-[60px] bg-white shadow-primary rounded-2xl">
                    <img
                      src={love_icon}
                      width={50}
                      height={50}
                      className="mx-auto"
                      alt="Love"
                    />
                  </button>
                </div>
                <p className="w-[72px] flex justify-center items-center z-20">
                  {currentImageIndex + 1}/{profile.images.length}
                </p>
                <div className="flex z-20">
                  <button
                    type="button"
                    id="back-preview-image-btn"
                    onClick={handlePreviousImage}
                    className="w-12 h-12 rounded-xl flex justify-center items-center"
                  >
                    <img src={back_icon} width={16} height={16} alt="Back" />
                  </button>
                  <button
                    type="button"
                    id="next-preview-image-btn"
                    onClick={handleNextImage}
                    className="w-12 h-12 rounded-xl flex justify-center items-center"
                  >
                    <img src={next_icon} width={16} height={16} alt="Next" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col px-4 py-6 gap-6 items-center text-gray-900 leading-6">
                <article className="w-full">
                  <h1 className="text-[46px] leading-[57.5px] font-extrabold mb-2">
                    {profile.name}{" "}
                    <span className="text-gray-700">
                      {getAge(profile.birthdate)}
                    </span>
                  </h1>
                  <div className="flex gap-4">
                    <img
                      src={location_icon}
                      width={24}
                      height={24}
                      alt="Location"
                    />
                    <p className="text-xl leading-[30px] font-semibold">
                      {profile.city}, {profile.location}
                    </p>
                  </div>
                </article>

                <section className="grid grid-cols-2 w-full py-2 gap-y-4">
                  <p className="flex items-center">Sexual identities</p>
                  <p className="font-semibold text-gray-700">
                    {profile.sexident}
                  </p>
                  <p className="flex items-center">Sexual preferences</p>
                  <p className="font-semibold text-gray-700">
                    {profile.sexprefer}
                  </p>
                  <p className="flex items-center">Racial preferences</p>
                  <p className="font-semibold text-gray-700">
                    {profile.racialprefer}
                  </p>
                  <p className="flex items-center">Meeting interests</p>
                  <p className="font-semibold text-gray-700">
                    {profile.meetprefer}
                  </p>
                </section>

                <article className="w-full">
                  <h2 className="mb-4 text-2xl font-bold lead-[30px]">
                    About me
                  </h2>
                  <p>{profile.aboutMe || "I know nothing...but you"}</p>
                </article>

                <article className="w-full">
                  <h2 className="mb-6 text-2xl font-bold lead-[30px]">
                    Hobbies and Interests
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {profile.hobbiesList?.map((item, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 rounded-xl border border-purple-300 text-purple-600"
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
    </section>
  );
}

export default SeeProfile;
