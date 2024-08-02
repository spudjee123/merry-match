import React, { useState } from "react";
import SeeProfileImage from "../../assets/images/seeprofile.png";
import richard from "../../assets/images/richard.jpg";
import reject_icon from "../../assets/icons/reject-icon.png";
import love_icon from "../../assets/icons/love-icon.png";
import arrowleft from "../../assets/images/arrowleft.png";
import back_icon from "../../assets/icons/back-vector-icon.png";
import next_icon from "../../assets/icons/next-vector-icon.png";
import location_icon from "../../assets/icons/location-icon.png";

function SeeProfile() {
  const [isSecondImage, setIsSecondImage] = useState(false);
  const [hobbiesList] = useState(["Reading", "Gaming", "Coding"]);

  return (
    <section>
      {/* Mobile and iPad view */}
      <div className="lg:hidden">
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
          className="modal bg-white w-screen h-screen mt-[110px]"
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
                style={{ backgroundImage: `url(${richard})` }}
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
                  {isSecondImage ? "2" : "1"}
                  <span className="text-gray-600">/2</span>
                </p>
                <div className="flex z-20">
                  <button
                    type="button"
                    id="back-preview-image-btn"
                    onClick={() => setIsSecondImage(false)}
                    className="w-12 h-12 rounded-xl flex justify-center items-center"
                  >
                    <img src={back_icon} width={16} height={16} alt="Back" />
                  </button>
                  <button
                    type="button"
                    id="next-preview-image-btn"
                    onClick={() => setIsSecondImage(true)}
                    className="w-12 h-12 rounded-xl flex justify-center items-center"
                  >
                    <img src={next_icon} width={16} height={16} alt="Next" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col px-4 py-6 gap-6 items-center text-gray-900 leading-6">
                <article className="w-full">
                  <h1 className="text-[46px] leading-[57.5px] font-extrabold mb-2">
                    {"John Snow"} <span className="text-gray-700">{26}</span>
                  </h1>
                  <div className="flex gap-4">
                    <img
                      src={location_icon}
                      width={24}
                      height={24}
                      alt="Location"
                    />
                    <p className="text-xl leading-[30px] font-semibold">
                      {"Bangkok, Thailand"}
                    </p>
                  </div>
                </article>

                <section className="grid grid-cols-2 w-full py-2 gap-y-4">
                  <p className="flex items-center">Sexual identities</p>
                  <p className="font-semibold text-gray-700">{"Male"}</p>
                  <p className="flex items-center">Sexual preferences</p>
                  <p className="font-semibold text-gray-700">{"Female"}</p>
                  <p className="flex items-center">Racial preferences</p>
                  <p className="font-semibold text-gray-700">{"Asian"}</p>
                  <p className="flex items-center">Meeting interests</p>
                  <p className="font-semibold text-gray-700">{"Friends"}</p>
                </section>

                <article className="w-full">
                  <h2 className="mb-4 text-2xl font-bold lead-[30px]">
                    About me
                  </h2>
                  <p>{"I know nothing...but you"}</p>
                </article>

                <article className="w-full">
                  <h2 className="mb-6 text-2xl font-bold lead-[30px]">
                    Hobbies and Interests
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {hobbiesList.map((item, index) => (
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
      <div className="max-lg:hidden">
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
                style={{ backgroundImage: `url(${richard})` }}
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
                  {isSecondImage ? "2" : "1"}
                  <span className="text-gray-600">/2</span>
                </p>
                <div className="flex z-20">
                  <button
                    type="button"
                    id="back-preview-image-btn"
                    onClick={() => setIsSecondImage(false)}
                    className="w-12 h-12 rounded-xl flex justify-center items-center"
                  >
                    <img src={back_icon} width={16} height={16} alt="Back" />
                  </button>
                  <button
                    type="button"
                    id="next-preview-image-btn"
                    onClick={() => setIsSecondImage(true)}
                    className="w-12 h-12 rounded-xl flex justify-center items-center"
                  >
                    <img src={next_icon} width={16} height={16} alt="Next" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col px-4 py-6 gap-6 items-center text-gray-900 leading-6">
                <article className="w-full">
                  <h1 className="text-[46px] leading-[57.5px] font-extrabold mb-2">
                    {"John Snow"} <span className="text-gray-700">{26}</span>
                  </h1>
                  <div className="flex gap-4">
                    <img
                      src={location_icon}
                      width={24}
                      height={24}
                      alt="Location"
                    />
                    <p className="text-xl leading-[30px] font-semibold">
                      {"Bangkok, Thailand"}
                    </p>
                  </div>
                </article>

                <section className="grid grid-cols-2 w-full py-2 gap-y-4">
                  <p className="flex items-center">Sexual identities</p>
                  <p className="font-semibold text-gray-700">{"Male"}</p>
                  <p className="flex items-center">Sexual preferences</p>
                  <p className="font-semibold text-gray-700">{"Female"}</p>
                  <p className="flex items-center">Racial preferences</p>
                  <p className="font-semibold text-gray-700">{"Asian"}</p>
                  <p className="flex items-center">Meeting interests</p>
                  <p className="font-semibold text-gray-700">{"Friends"}</p>
                </section>

                <article className="w-full">
                  <h2 className="mb-4 text-2xl font-bold lead-[30px]">
                    About me
                  </h2>
                  <p>{"I know nothing...but you"}</p>
                </article>

                <article className="w-full">
                  <h2 className="mb-6 text-2xl font-bold lead-[30px]">
                    Hobbies and Interests
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {hobbiesList.map((item, index) => (
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
