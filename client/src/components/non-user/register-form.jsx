import { useEffect, useState } from "react";
import * as countryDB from "../../assets/test-data/Countrydata.json";
import exit_icon from "../../assets/icons/cancel-icon.png";
import back_icon from "../../assets/icons/back-vector-icon.png";
import next_icon from "../../assets/icons/next-vector-icon.png";
import location_icon from "../../assets/icons/location-icon.png";
import reject_icon from "../../assets/icons/reject-icon.png";
import love_icon from "../../assets/icons/love-icon.png";
import preview_exit_icon from "../../assets/icons/preview-exit-icon.png";

function RegisterForm() {
  const [hobbiesList, setHobbiesList] = useState([]);
  const [hobby, setHobby] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [cityList, setCityList] = useState([]);
  const [isSecondImage, setIsSecondImage] = useState(false);
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const locationDB = countryDB.data.map((item) => item.country_name);
  const sexDB = ["male", "female", "other"];
  const raceDB = ["Asian", "Black", "White", "Middle east"];
  const meetingDB = [
    "long term fish and chip",
    "friend with buffet",
    "one night swensen",
    "only fries",
    "24-7 eleven",
    "keep donut",
  ];
  const [images, setImages] = useState(["", "", "", "", ""]);
  const [step, setStep] = useState(1);

  console.log(images);
  useEffect(() => {
    setCityList(
      countryDB.data
        .filter((item) => item.country_name === location)[0]
        ?.states?.map((item) => item.state_name) ?? []
    );
  }, [location]);
  const inputClassName =
    "h-12 p-3 pr-4 gap-2 rounded-lg border border-gray-400 text-gray-900 bg-white";
  const formGroupClassName = "flex flex-col gap-1 w-full";
  const formGroupRowClassName =
    "flex flex-col-reverse gap-6 lg:flex-row-reverse lg:gap-6";
  const formClassName = "flex flex-col gap-6 leading-6 lg:gap-10 ";
  return (
    <>
      <form className="">
        <section className="gap-10 lg:gap-20 flex flex-col px-4 py-10 lg:px-60 lg:pt-20 lg:pb-[60px] min-h-[calc(100vh-164px)] lg:min-h-[calc(100vh-200px)]">
          <section className=" flex justify-between">
            <article>
              <h1 className=" text-sm font-semibold leading-[21px] text-beige-700 mb-2">
                REGISTER
              </h1>
              <p className=" text-purple-500 text-[32px] leading-10 font-bold lg:text-[46px] lg:font-extrabold lg:leading-[57.5px]">
                Join us and start
              </p>
              <p className=" text-purple-500 text-[32px] leading-10 font-bold lg:text-[46px] lg:font-extrabold lg:leading-[57.5px]">
                matching
              </p>
            </article>
            <div className=" hidden lg:flex justify-end items-end gap-4">
              <button
                type="button"
                id="preview-btn"
                className=" px-6 py-3 bg-red-100 text-red-600 font-bold leading-6 text-center rounded-[99px] drop-shadow-secondary"
                onClick={(event) => {
                  event.preventDefault();
                  setStep(1);
                }}
              >
                1
              </button>
              <button
                type="button"
                id="preview-btn"
                className=" px-6 py-3 bg-red-100 text-red-600 font-bold leading-6 text-center rounded-[99px] drop-shadow-secondary"
                onClick={(event) => {
                  event.preventDefault();
                  setStep(2);
                }}
              >
                2
              </button>
              <button
                type="button"
                id="preview-btn"
                className=" px-6 py-3 bg-red-100 text-red-600 font-bold leading-6 text-center rounded-[99px] drop-shadow-secondary"
                onClick={(event) => {
                  event.preventDefault();
                  setStep(3);
                }}
              >
                3
              </button>
            </div>
          </section>

          {step === 1 ? (
            <section>
              <h2 className="mb-6 font-bold text-2xl leading-[30px] text-gray-900">
                Basic Information
              </h2>
              <div className="flex flex-col gap-6 leading-6 lg:gap-10 ">
                <div className="flex flex-col-reverse gap-6 lg:flex-row-reverse lg:gap-6">
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="dateOfBirth">Date of birth</label>
                    <input
                      id="dateOfBirth"
                      className="h-12 p-3 pr-4 gap-2 rounded-lg border border-gray-400 bg-white text-gray-900"
                      type="date"
                      required
                    />
                  </div>

                  <div className={formGroupClassName}>
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      className={inputClassName}
                      type="text"
                      maxLength="50"
                      required
                    />
                  </div>
                </div>

                <div className={formGroupRowClassName}>
                  <div className={formGroupClassName}>
                    <label htmlFor="city">City</label>
                    <select id="city" className={inputClassName}>
                      <option selected>select one</option>
                      {cityList.map((item, index) => (
                        <option key={index}>{item}</option>
                      ))}
                    </select>
                  </div>

                  <div className={formGroupClassName}>
                    <label htmlFor="location">Location</label>
                    <select
                      id="location"
                      className={inputClassName}
                      onChange={(event) => {
                        setLocation(event.target.value);
                      }}
                    >
                      <option selected>select one</option>
                      {locationDB.map((item, index) => (
                        <option key={index}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={formGroupRowClassName}>
                  <div className={formGroupClassName}>
                    <label htmlFor="email" className="text-gray-600">
                      Email
                    </label>
                    <input
                      id="email"
                      className={
                        "h-12 p-3 pr-4 gap-2 rounded-lg border border-gray-400 text-gray-900 bg-gray-200"
                      }
                      type="email"
                      disabled
                    />
                  </div>

                  <div className={formGroupClassName}>
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      className={inputClassName}
                      type="text"
                      maxLength="6"
                      required
                    />
                  </div>
                </div>

                <div className={formGroupRowClassName}>
                  <div className={formGroupClassName}>
                    <label htmlFor="confirmed-password">Confirm password</label>
                    <input
                      id="confirmed-password"
                      className={inputClassName}
                      type="password"
                      maxLength="8"
                      required
                    />
                  </div>
                  <div className={formGroupClassName}>
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      className={inputClassName}
                      type="password"
                      maxLength="8"
                      required
                    />
                  </div>
                </div>
              </div>
            </section>
          ) : step === 2 ? (
            <section>
              <h2 className="mb-6 font-bold text-2xl leading-[30px] text-gray-900">
                Identities and Interests
              </h2>
              <div className={formClassName}>
                <div className={formGroupRowClassName}>
                  <div className={formGroupClassName}>
                    <label htmlFor="sexPrefer">Sexual preferences:</label>
                    <select id="sexPrefer" className={inputClassName}>
                      <option selected>select one</option>
                      {sexDB.map((item, index) => (
                        <option key={index}>{item}</option>
                      ))}
                    </select>
                  </div>

                  <div className={formGroupClassName}>
                    <label htmlFor="sexIden">Sexual identities:</label>
                    <select id="sexIden" className={inputClassName}>
                      <option selected>select one</option>
                      {sexDB.map((item, index) => (
                        <option key={index}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={formGroupRowClassName}>
                  <div className={formGroupClassName}>
                    <label htmlFor="meeting">Meeting interest:</label>
                    <select id="meeting" className={inputClassName}>
                      <option selected>select one</option>
                      {meetingDB.map((item, index) => (
                        <option key={index}>{item}</option>
                      ))}
                    </select>
                  </div>

                  <div className={formGroupClassName}>
                    <label htmlFor="racePrefer">Racial preferences:</label>
                    <select id="racePrefer" className={inputClassName}>
                      <option selected>select one</option>
                      {raceDB.map((item, index) => (
                        <option key={index}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={formGroupClassName + " lg:col-span-full"}>
                  <label htmlFor="hobby">
                    Hobbies / Interests (Maximum 10):
                  </label>

                  <div className=" flex flex-wrap p-3 pr-4 gap-2 rounded-lg border border-gray-400 bg-white text-gray-900">
                    {hobbiesList.map((item, index) => {
                      return (
                        <div
                          className=" flex h-full bg-purple-100 px-2 py-1 rounded-md text-purple-600 gap-2"
                          key={index}
                        >
                          <p>{item}</p>
                          <button
                            type="button"
                            id={"delete-hobby-btn " + index}
                            onClick={() => {
                              setHobbiesList(hobbiesList.toSpliced(index, 1));
                            }}
                          >
                            X
                          </button>
                        </div>
                      );
                    })}

                    <input
                      id="hobby"
                      name="hobby"
                      type="text"
                      value={hobby}
                      className="grow px-2 bg-white"
                      onChange={(event) => setHobby(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          setHobbiesList([...hobbiesList, hobby]);
                          setHobby("");
                        }
                      }}
                      maxLength="15"
                      disabled={hobbiesList.length === 10}
                    />
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section>
              <article className=" flex flex-col gap-1 mb-6">
                <h3 className=" text-purple-500 text-2xl leading-[30px] font-bold">
                  Profile pictures
                </h3>
                <p className=" text-gray-800 leading-6">
                  Upload at least 2 photos
                </p>
              </article>
              <div className=" flex flex-wrap gap-2 lg:gap-6 lg:justify-center">
                {images.map((item, index) => (
                  <div
                    key={index}
                    className=" w-[167px] h-[167px] bg-gray-200 rounded-2xl"
                  >
                    {item ? (
                      <div className="relative w-full h-full">
                        <img
                          src={URL.createObjectURL(item)}
                          className=" w-[167px] h-[167px] rounded-2xl object-cover"
                          alt={"uploaded photo " + index}
                        />
                        <button
                          type="button"
                          id={"remove-image-btn " + index}
                          onClick={() => {
                            const newImages = [...images];
                            newImages.splice(index, 1);
                            newImages.push("");
                            setImages(newImages);
                          }}
                          className="absolute top-[-4px] right-[-4px] bg-red-utility w-6 h-6 rounded-full text-white"
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col text-center items-center justify-center text-sm text-purple-600 leading-[21px] font-medium gap-2 rounded-2xl">
                          <p>+</p>
                          <p>Upload photo</p>
                        </div>
                        <input
                          type="file"
                          onChange={(event) => {
                            event.preventDefault();
                            const newImages = [...images];
                            newImages[index] = event.target.files[0];
                            setImages(newImages);
                          }}
                          className=" w-full h-full opacity-0"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </section>
        <footer className=" h-28 bg-red-utility"></footer>
      </form>
    </>
  );
}

export default RegisterForm;
