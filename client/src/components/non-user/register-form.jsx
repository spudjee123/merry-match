import { useEffect, useState } from "react";
import * as countryDB from "../../assets/test-data/Countrydata.json";
import useRegister from '../hooks/hooks'
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    "only friends",
    "24-7 eleven",
    "keep donut",
  ];
  const [images, setImages] = useState(["", "", "", "", ""]);
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    name: "",
    dateOfBirth: "",
    location: "",
    city: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    sexIden: "",
    sexPrefer: "",
    racePrefer: "",
    meeting: "",
    hobbiesList: [],
    images: ["", "", "", "", ""],
  });
  // const { createId, isError, isLoading } = useRegister();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await axios.post("http://localhost:4001/register",userInfo)
    console.log(result)
  };

  console.log(userInfo);
  useEffect(() => {
    setCityList(
      countryDB.data
        .filter((item) => item.country_name === location)[0]
        ?.states?.map((item) => item.state_name) ?? []
    );
  }, [location]);
  const inputClassName =
    "h-12 p-3 pr-4 gap-2 rounded-lg border border-gray-400 text-gray-900 bg-white placeholder:text-gray-600";
  const formGroupClassName = "flex flex-col gap-1 w-full";
  const formGroupRowClassName =
    "flex flex-col-reverse gap-6 lg:flex-row-reverse lg:gap-6";
  const formClassName = "flex flex-col gap-6 leading-6 lg:gap-10 ";

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <section className="gap-10 lg:gap-20 flex flex-col px-4 py-10 lg:px-60 lg:pt-20 lg:pb-[60px] min-h-[calc(100vh-164px)] lg:min-h-[calc(100vh-200px)]">
          <section className=" flex flex-col max-lg:gap-[37px] lg:flex-row lg:justify-between">
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
            <div className="flex lg:justify-end lg:items-end">
              <div className=" flex gap-2 lg:gap-4 item-center">
                <button
                  type="button"
                  id="register-step-1-btn"
                  className={` rounded-2xl border-2 border-gray-300 p-2 text-purple-500 font-extrabold flex gap-2 ${
                    step === 1 ? " sm:pr-8 text-nowrap " : " "
                  }`}
                  onClick={(event) => {
                    event.preventDefault();
                    setStep(1);
                  }}
                >
                  <p
                    className={` w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center ${
                      step === 1 ? "" : " text-gray-600"
                    }`}
                  >
                    1
                  </p>

                  {step === 1 ? (
                    <div className=" text-start">
                      <p className=" text-gray-700 text-xs leading-[18px] font-medium">
                        Step {step}/3
                      </p>
                      <p>Basic Information</p>
                    </div>
                  ) : null}
                </button>
                <button
                  type="button"
                  id="register-step-2-btn"
                  className={` rounded-2xl border-2 border-gray-300 p-2 text-purple-500 font-extrabold flex gap-2 ${
                    step === 2 ? " sm:pr-8 text-nowrap " : " "
                  }`}
                  onClick={(event) => {
                    event.preventDefault();
                    setStep(2);
                  }}
                >
                  <p
                    className={` w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center ${
                      step === 2 ? " " : " text-gray-600"
                    }`}
                  >
                    2
                  </p>

                  {step === 2 ? (
                    <div className=" text-start">
                      <p className=" text-gray-700 text-xs leading-[18px] font-medium">
                        Step {step}/3
                      </p>
                      <p>Identities and Interests</p>
                    </div>
                  ) : null}
                </button>
                <button
                  type="button"
                  id="register-step-3-btn"
                  className={` rounded-2xl border-2 border-gray-300 p-2 text-purple-500 font-extrabold flex gap-2 ${
                    step === 3 ? " sm:pr-8 text-nowrap " : " "
                  }`}
                  onClick={(event) => {
                    event.preventDefault();
                    setStep(3);
                  }}
                >
                  <p
                    className={` w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center ${
                      step === 3 ? " " : " text-gray-600 "
                    }`}
                  >
                    3
                  </p>

                  {step === 3 ? (
                    <div className=" text-start">
                      <p className=" text-gray-700 text-xs leading-[18px] font-medium">
                        Step {step}/3
                      </p>
                      <p>Upload Photos</p>
                    </div>
                  ) : null}
                </button>
              </div>
            </div>
          </section>

          {step === 1 ? (
            <section>
              <h2 className="mb-6 font-bold text-2xl leading-[30px] text-purple-500">
                Basic Information
              </h2>
              <div className="flex flex-col gap-6 leading-6 lg:gap-10 ">
                <div className="flex flex-col-reverse gap-6 lg:flex-row-reverse lg:gap-6">
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="dateOfBirth">Date of birth</label>
                    <input
                      id="dateOfBirth"
                      className="h-12 p-3 pr-4 gap-2 rounded-lg border border-gray-400 bg-white text-gray-900 placeholder:text-gray-600"
                      type="date"
                      value={userInfo.dateOfBirth}
                      onChange={(event) =>
                        setUserInfo({
                          ...userInfo,
                          dateOfBirth: event.target.value,
                        })
                      }
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
                      value={userInfo.name}
                      onChange={(event) =>
                        setUserInfo({ ...userInfo, name: event.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className={formGroupRowClassName}>
                  <div className={formGroupClassName}>
                    <label htmlFor="city">City</label>
                    <select
                      id="city"
                      className={inputClassName}
                      value={userInfo.city}
                      onChange={(event) =>
                        setUserInfo({ ...userInfo, city: event.target.value })
                      }
                    >
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
                      value={userInfo.location}
                      onChange={(event) => {
                        setLocation(event.target.value);
                        setUserInfo({
                          ...userInfo,
                          location: event.target.value,
                        });
                      }}
                    >
                      {locationDB.map((item, index) => (
                        <option key={index}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={formGroupRowClassName}>
                  <div className={formGroupClassName}>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      className={inputClassName}
                      type="email"
                      placeholder="name@website.com"
                      value={userInfo.email}
                      onChange={(event) =>
                        setUserInfo({ ...userInfo, email: event.target.value })
                      }
                    />
                  </div>

                  <div className={formGroupClassName}>
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      className={inputClassName}
                      type="text"
                      minLength="6"
                      placeholder="At least 6 characters"
                      value={userInfo.username}
                      onChange={(event) =>
                        setUserInfo({
                          ...userInfo,
                          username: event.target.value,
                        })
                      }
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
                      minLength="8"
                      placeholder="At least 8 characters"
                      value={userInfo.confirmPassword}
                      onChange={(event) =>
                        setUserInfo({
                          ...userInfo,
                          confirmPassword: event.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className={formGroupClassName}>
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      className={inputClassName}
                      value={userInfo.password}
                      onChange={(event) =>
                        setUserInfo({
                          ...userInfo,
                          password: event.target.value,
                        })
                      }
                      type="password"
                      minLength="8"
                      placeholder="At least 8 characters"
                      required
                    />
                  </div>
                </div>
              </div>
            </section>
          ) : step === 2 ? (
            <section>
              <h2 className="mb-6 font-bold text-2xl leading-[30px] text-purple-500">
                Identities and Interests
              </h2>
              <div className={formClassName}>
                <div className={formGroupRowClassName}>
                  <div className={formGroupClassName}>
                    <label htmlFor="sexPrefer">Sexual preferences:</label>
                    <select
                      id="sexPrefer"
                      value={userInfo.sexPrefer}
                      onChange={(event) =>
                        setUserInfo({
                          ...userInfo,
                          sexPrefer: event.target.value,
                        })
                      }
                      className={inputClassName}
                    >
                      {sexDB.map((item, index) => (
                        <option key={index}>{item}</option>
                      ))}
                    </select>
                  </div>

                  <div className={formGroupClassName}>
                    <label htmlFor="sexIden">Sexual identities:</label>
                    <select
                      id="sexIden"
                      value={userInfo.sexIden}
                      onChange={(event) =>
                        setUserInfo({
                          ...userInfo,
                          sexIden: event.target.value,
                        })
                      }
                      className={inputClassName}
                    >
                      {sexDB.map((item, index) => (
                        <option key={index}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={formGroupRowClassName}>
                  <div className={formGroupClassName}>
                    <label htmlFor="meeting">Meeting interest:</label>
                    <select
                      id="meeting"
                      value={userInfo.meeting}
                      onChange={(event) =>
                        setUserInfo({
                          ...userInfo,
                          meeting: event.target.value,
                        })
                      }
                      className={inputClassName}
                    >
                      {meetingDB.map((item, index) => (
                        <option key={index}>{item}</option>
                      ))}
                    </select>
                  </div>

                  <div className={formGroupClassName}>
                    <label htmlFor="racePrefer">Racial preferences:</label>
                    <select
                      id="racePrefer"
                      value={userInfo.racePrefer}
                      onChange={(event) =>
                        setUserInfo({
                          ...userInfo,
                          racePrefer: event.target.value,
                        })
                      }
                      className={inputClassName}
                    >
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
                      onChange={(event) => {
                        setHobby(event.target.value);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          setHobbiesList([...hobbiesList, hobby]);
                          setUserInfo({
                            ...userInfo,
                            hobbiesList: hobbiesList,
                          });
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
        <footer className=" h-28 bg-white px-4 lg:px-40 py-8 flex justify-between items-center border-t-2 border-gray-300">
          <p className=" w-6 lg:w-[72px] h-12 text-gray-700 px-0 lg:px-6 py-3">
            {step}
            <span className=" text-gray-600">/3</span>
          </p>
          <div className=" w-[220px] lg:w-[207px] h-12 flex items-center gap-6   ">
            <button
              type="button"
              className={`${step === 1 ? "text-gray-500" : "text-red-500"}`}
              disabled={step === 1}
              onClick={(event) => {
                event.preventDefault();
                setStep(step - 1);
              }}
            >
              &larr; back
            </button>
            <button
              className=" h-12 px-6 py-3 bg-red-500 drop-shadow-primary text-white rounded-[99px]"
              type={step === 3 ? "submit" : "button"}
              onClick={(event) => {
                step === 3
                  ? setStep(3)
                  : (event.preventDefault(), setStep(step + 1));
              }}
            >
              {step === 3 ? "Confirm" : "Next Step"}
            </button>
          </div>
        </footer>
      </form>
    </>
  );
}

export default RegisterForm;
