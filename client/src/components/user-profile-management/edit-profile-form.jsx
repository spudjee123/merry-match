import { useEffect, useState } from "react";
import * as countryDB from "../../assets/test-data/Countrydata.json";

function EditProfileForm() {
  const [hobbiesList, setHobbiesList] = useState([]);
  const [hobby, setHobby] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [cityList, setCityList] = useState([]);
  const locationDB = countryDB.data.map((item) => item.country_name);
  const sexDB = ["male", "female", "other"];
  const raceDB = ["Asian", "Black", "White", "Middle east"];
  const [images, setImages] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
  });

  console.log(images);
  useEffect(() => {
    setCityList(
      countryDB.data
        .filter((item) => item.country_name === location)[0]
        ?.states?.map((item) => item.state_name) ?? []
    );
  }, [location]);
  const inputClassName =
    "h-12 p-3 pr-4 gap-2 rounded-lg border border-color-gray-400 bg-white text-color-gray-900";
  const formGroupClassName = "flex flex-col gap-1";
  const formClassName =
    "flex flex-col gap-6 leading-6 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-10";
  return (
    <>
      <form className="gap-10 lg:gap-20 flex flex-col">
        <section>
          <article>
            <h1 className=" text-sm font-semibold leading-[21px] text-color-beige-700">
              PROFILE
            </h1>
            <p className=" text-color-purple-500 text-[32px] leading-10 font-bold lg:text-[46px] lg:font-extrabold lg:leading-[57.5px]">
              Let’s make profile to let others know you
            </p>
          </article>
        </section>

        <section>
          <h2 className="mb-6 font-bold text-2xl leading-[30px]">
            Basic Information
          </h2>
          <div className="flex flex-col gap-6 leading-6 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-10">
            <div className="flex flex-col gap-1">
              <label htmlFor="dateOfBirth">Date of birth</label>
              <input
                id="dateOfBirth"
                className="h-12 p-3 pr-4 gap-2 rounded-lg border border-color-gray-400 bg-white text-color-gray-900"
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
                required
              />
            </div>

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

            <div className={formGroupClassName}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className={inputClassName}
                type="email"
                required
              />
            </div>

            <div className={formGroupClassName}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                className={inputClassName}
                type="text"
                required
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-6 font-bold text-2xl leading-[30px]">
            Identities and Interests
          </h2>
          <div className={formClassName}>
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

            <div className={formGroupClassName}>
              <label htmlFor="meeting">Meeting interest:</label>
              <input
                id="meeting"
                className={inputClassName}
                type="text"
                required
              />
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

            <div className={formGroupClassName + " lg:col-span-full"}>
              <label htmlFor="hobby">Hobbies / Interests (Maximum 10):</label>

              <div className=" flex flex-wrap p-3 pr-4 gap-2 rounded-lg border border-color-gray-400 bg-white text-color-gray-900">
                {hobbiesList.map((item, index) => {
                  return (
                    <div
                      className=" flex h-full bg-color-purple-100 px-2 py-1 rounded-md text-color-purple-600 gap-2"
                      key={index}
                    >
                      <p>{item}</p>
                      <button
                        type="button"
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
                  className="grow px-2"
                  onChange={(event) => setHobby(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      setHobbiesList([...hobbiesList, hobby]);
                      setHobby("");
                    }
                  }}
                  disabled={hobbiesList.length === 10}
                />
              </div>
            </div>

            <div className={formGroupClassName + " lg:col-span-full"}>
              <label htmlFor="aboutMe">
                About Me (Maximum 150 characters):
              </label>
              <textarea
                id="aboutMe"
                className="p-3 pr-4 gap-2 rounded-lg border border-color-gray-400 bg-white text-color-gray-900"
                rows="4"
                maxLength="150"
                required
              ></textarea>
            </div>
          </div>
        </section>
        <section>
          <h3 className=" text-color-purple-500 text-2xl leading-[30px] font-bold">
            Profile pictures
          </h3>
          <p className=" text-color-gray-800 leading-6">
            Upload at least 2 photos
          </p>
          <div className=" flex flex-wrap gap-2 lg:gap-6 lg:justify-center">
            {Object.keys(images).map((item, index) => (
              <div
                key={index}
                className=" w-[167px] h-[167px] bg-color-gray-200 rounded-2xl"
              >
                {images[item] ? (
                  <div className="relative w-full h-full">
                    <img
                      src={URL.createObjectURL(images[item])}
                      className=" w-[167px] h-[167px] rounded-2xl object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = { ...images };
                        newImages[item] = "";
                        setImages(newImages);
                      }}
                      className="absolute top-[-4px] right-[-4px] bg-color-red-utility w-6 h-6 rounded-full text-white"
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col text-center items-center justify-center text-sm text-color-purple-600 leading-[21px] font-medium gap-2 rounded-2xl">
                      <p>+</p>
                      <p>Upload photo</p>
                    </div>
                    <input
                      type="file"
                      onChange={(event) => {
                        const newImages = { ...images };
                        newImages[item] = event.target.files[0];
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
      </form>
    </>
  );
}

export default EditProfileForm;
