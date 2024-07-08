import { useEffect, useState } from "react";

function EditProfileForm() {
  const [hobbiesList, setHobbiesList] = useState([""]);
  const [hobby, setHobby] = useState("");
  const cityDB = ["Bangkok", "ChiangMai", "Phuget"];
  const locationDB = ["Thailand", "United States", "China"];
  const sexDB = ["male", "female", "other"];
  const raceDB = ["Asian", "Black", "White", "Middle east"];
  const inputClassName =
    "h-12 p-3 pr-4 gap-2 rounded-lg border border-color-gray-400 bg-white text-color-gray-900";
  const formClassName =
    "flex flex-col leading-6 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-10";
  const formGroupClassName = "flex flex-col gap-1";
  useEffect(() => {
    setHobbiesList([]);
    setHobby("");
  }, []);
  return (
    <>
      <form className="gap-10 lg:gap-20 flex flex-col">
        <article>
          <h1>PROFILE</h1>
          <p>Let’s make profile to let others know you</p>
        </article>

        <section>
          <h2 className="mb-6 font-bold text-2xl leading-[30px]">
            Basic Information
          </h2>
          <div className="flex flex-col leading-6 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-10">
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
                <option diabled selected>
                  select one
                </option>
                {cityDB.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
            </div>

            <div className={formGroupClassName}>
              <label htmlFor="location">Location</label>
              <select id="location" className={inputClassName}>
                <option diabled selected>
                  select one
                </option>
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
                <option diabled selected>
                  select one
                </option>
                {sexDB.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
            </div>

            <div className={formGroupClassName}>
              <label htmlFor="sexIden">Sexual identities:</label>
              <select id="sexIden" className={inputClassName}>
                <option diabled selected>
                  select one
                </option>
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
                <option diabled selected>
                  select one
                </option>
                {raceDB.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
            </div>

            <div className={formGroupClassName + " lg:col-span-full"}>
              <label htmlFor="hobby">Hobbies / Interests (Maximum 10):</label>

              {hobbiesList.map((item, index) => {
                return <p key={index}>{item}</p>;
              })}

              <input
                id="hobby"
                name="hobby"
                type="text"
                value={hobby}
                className={inputClassName}
                onChange={(event) => setHobby(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setHobbiesList([...hobbiesList, hobby]);
                    setHobby("");
                  }
                }}
              />
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
      </form>
    </>
  );
}

export default EditProfileForm;
