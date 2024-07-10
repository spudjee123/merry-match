import { useEffect, useState } from "react";
import * as countryDB from "../../assets/test-data/Countrydata.json";
import exit_icon from "../../assets/icons/user-profile-management/exit-icon.png";

function EditProfileForm() {
  const [hobbiesList, setHobbiesList] = useState([]);
  const [hobby, setHobby] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [cityList, setCityList] = useState([]);
  const locationDB = countryDB.data.map((item) => item.country_name);
  const sexDB = ["male", "female", "other"];
  const raceDB = ["Asian", "Black", "White", "Middle east"];
  const [images, setImages] = useState(["", "", "", "", ""]);

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
    "flex flex-col gap-6 lg:flex-row-reverse lg:gap-6";
  const formClassName = "flex flex-col gap-6 leading-6 lg:gap-10 ";
  return (
    <>
      <form className="gap-10 lg:gap-20 flex flex-col">
        <section className=" flex justify-between">
          <article>
            <h1 className=" text-sm font-semibold leading-[21px] text-beige-700 mb-2">
              PROFILE
            </h1>
            <p className=" text-purple-500 text-[32px] leading-10 font-bold lg:text-[46px] lg:font-extrabold lg:leading-[57.5px]">
              Let’s make profile
            </p>
            <p className=" text-purple-500 text-[32px] leading-10 font-bold lg:text-[46px] lg:font-extrabold lg:leading-[57.5px]">
              to let others know you
            </p>
          </article>
          <div className=" hidden lg:flex justify-end items-end gap-4">
            <button
              type="button"
              id="preview-btn"
              className=" h-12 px-6 py-3 bg-red-100 text-red-600 font-bold leading-6 text-center rounded-[99px] drop-shadow-secondary"
              onClick={() => document.getElementById("preview").showModal()}
            >
              Preview Profile
            </button>
            <button
              type="submit"
              id="update-btn"
              className=" h-12 px-6 py-3 bg-red-500 text-white font-bold leading-6 text-center rounded-[99px] drop-shadow-primary"
            >
              Update Profile
            </button>
          </div>
        </section>

        <section>
          <h2 className="mb-6 font-bold text-2xl leading-[30px]">
            Basic Information
          </h2>
          <div className="flex flex-col gap-6 leading-6 lg:gap-10 ">
            <div className="flex flex-col gap-6 lg:flex-row-reverse lg:gap-6">
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
          </div>
        </section>

        <section>
          <h2 className="mb-6 font-bold text-2xl leading-[30px]">
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
            </div>
            <div className={formGroupClassName + " lg:col-span-full"}>
              <label htmlFor="hobby">Hobbies / Interests (Maximum 10):</label>

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
                  className="grow px-2"
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

            <div className={formGroupClassName + " lg:col-span-full"}>
              <label htmlFor="aboutMe">
                About Me (Maximum 150 characters):
              </label>
              <textarea
                id="aboutMe"
                className="p-3 pr-4 gap-2 rounded-lg border border-gray-400 bg-white text-gray-900"
                rows="4"
                maxLength="150"
                required
              ></textarea>
            </div>
          </div>
        </section>
        <section>
          <article className=" flex flex-col gap-1 mb-6">
            <h3 className=" text-purple-500 text-2xl leading-[30px] font-bold">
              Profile pictures
            </h3>
            <p className=" text-gray-800 leading-6">Upload at least 2 photos</p>
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
        <section className=" flex justify-center gap-4 lg:hidden">
          <button
            type="button"
            id="preview-btn"
            className=" h-12 px-6 py-3 bg-red-100 text-red-600 font-bold leading-6 text-center rounded-[99px] drop-shadow-secondary"
          >
            Preview Profile
          </button>
          <button
            type="submit"
            id="update-btn"
            className=" h-12 px-6 py-3 bg-red-500 text-white font-bold leading-6 text-center rounded-[99px] drop-shadow-primary"
          >
            Update Profile
          </button>
        </section>
        <section className=" flex justify-center lg:justify-end">
          <button
            type="button"
            id="delete-profile-btn"
            className=" text-gray-700 font-bold leading-6"
            onClick={() => document.getElementById("delete").showModal()}
          >
            delete account
          </button>
        </section>
        <dialog id="delete" className="modal rounded-2xl lg:rounded-3xl p-0">
          <div className="modal-box p-0 shadow-primary">
            <div className="flex justify-between items-center h-14 px-6 py-2 border-b-2 m-0">
              <h3 className=" text-xl leading-6 font-semibold">
                Delete Confirmation
              </h3>

              <form method="dialog">
                <button
                  className="btn btn-sm btn-square btn-ghost"
                  id="exit-delete-btn"
                >
                  <img src={exit_icon} width={9.94} height={9.7} />
                </button>
              </form>
            </div>
            <div className=" p-4 lg:p-6 flex flex-col gap-6">
              <p className=" text-gray-700 leading-6">
                Do you sure to delete account?
              </p>
              <div className=" flex flex-col lg:flex-row gap-4">
                <button
                  id="confirm-delete-btn"
                  className=" bg-red-100 px-6 py-3 max-lg:w-full rounded-[99px] text-red-600 leading-6 font-bold drop-shadow-secondary"
                >
                  Yes, I want to delete
                </button>
                <form method="dialog">
                  <button
                    id="denied-delete-btn"
                    className=" bg-red-500 px-6 py-3 max-lg:w-full rounded-[99px] text-white leading-6 font-bold drop-shadow-primary"
                  >
                    No, I don’t
                  </button>
                </form>
              </div>
            </div>
          </div>
        </dialog>

        <dialog id="preview" className="modal">
          <div className="modal-box px-16 py-20 shadow-primary">
            <form method="dialog">
              <button
                id="exit-preview-btn"
                className="btn btn-lg btn-square btn-ghost absolute top-0 right-0"
              >
                <img src={exit_icon} width={16} height={16} />
              </button>
            </form>
            <div className=" flex justify-between">
              <div></div>
              <div className=" flex flex-col items-end text-gray-900">
                <article>
                  <h1 className=" text-5xl leading-[57.5px]">
                    {"John Snow"} <span>{26}</span>
                  </h1>
                  <div>
                    <img />
                    <p>{"Bangkok, Thailand"}</p>
                  </div>
                </article>
                <section>
                  <p>Sexual identities</p>
                  <p>{"Male"}</p>
                  <p>Sexual preferences</p>
                  <p>{"Female"}</p>
                  <p>Racial preferences</p>
                  <p>{"Asian"}</p>
                  <p>Meeting interests</p>
                  <p>{"Friends"}</p>
                </section>

                <article>
                  <h2>About me</h2>
                  <p>{"I know nothing...but you"}</p>
                </article>

                <article>
                  <h2>Hobbies and Interests</h2>
                  <div>
                    {hobbiesList.map((item, index) => (
                      <div>{item}</div>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </div>
        </dialog>
      </form>
    </>
  );
}

export default EditProfileForm;
