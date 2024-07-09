import { useEffect, useState } from "react";

function EditProfileForm() {
  const [hobbiesList, setHobbiesList] = useState([""]);
  const [hobby, setHobby] = useState("");
  const cityDB = ["Bangkok, ChiangMai, Phuget"];
  useEffect(() => {
    setHobbiesList([]);
    setHobby("");
  }, []);
  return (
    <>
      <form>
        <article>
          <h1>PROFILE</h1>
          <p>Let’s make profile to let others know you</p>
        </article>

        <h2>Basic Information</h2>
        <div className="flex flex-col">
          <div className="form-group flex flex-col">
            <label htmlFor="dateOfBirth">Date of birth</label>
            <input id="dateOfBirth" name="dateOfBirth" type="date" required />
          </div>

          <div className="form-group flex flex-col">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required />
          </div>

          <div className="form-group flex flex-col">
            <label htmlFor="city">City</label>
            <select id="city">
              <option diabled selected>
                City
              </option>
              <option>Bangkok</option>
              <option>Chiangmai</option>
              <option>Phuket</option>
            </select>
          </div>

          <div className="form-group flex flex-col">
            <label htmlFor="location">Location</label>
            <select id="location">
              <option diabled selected>
                Location
              </option>
              <option>Thailand</option>
              <option>United States</option>
              <option>China</option>
            </select>
          </div>

          <div className="form-group flex flex-col">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div className="form-group flex flex-col">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" required />
          </div>
        </div>

        <h2>Identities and Interests</h2>
        <div>
          <div className="form-group flex flex-col">
            <label htmlFor="sexPrefer">Sexual preferences:</label>
            <input id="sexPrefer" name="sexPrefer" type="text" required />
          </div>

          <div className="form-group flex flex-col">
            <label htmlFor="sexIden">Sexual identities:</label>
            <input id="sexIden" name="sexIden" type="text" required />
          </div>

          <div className="form-group flex flex-col">
            <label htmlFor="meeting">Meeting interest:</label>
            <input id="meeting" name="meeting" type="text" required />
          </div>

          <div className="form-group flex flex-col">
            <label htmlFor="racePrefer">Racial preferences:</label>
            <input id="racePrefer" name="racePrefer" type="text" required />
          </div>

          <div className="form-group flex flex-col">
            <label htmlFor="hobby">Hobbies / Interests (Maximum 10):</label>

            {hobbiesList.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}

            <input
              id="hobby"
              name="hobby"
              type="text"
              value={hobby}
              onChange={(event) => setHobby(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setHobbiesList([...hobbiesList, hobby]);
                  setHobby("");
                }
              }}
            />
          </div>

          <div className="form-group flex flex-col">
            <label htmlFor="aboutMe">About Me (Maximum 150 characters):</label>
            <textarea
              id="aboutMe"
              name="aboutMe"
              rows="4"
              maxLength="150"
              required
            ></textarea>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditProfileForm;
