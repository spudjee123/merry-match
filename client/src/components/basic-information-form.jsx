function BasicInformationForm(props) {
  const inputClassName =
    "h-12 p-3 pr-4 gap-2 rounded-lg border border-gray-400 text-gray-900 bg-white";
  const formGroupClassName = "flex flex-col gap-1 w-full";
  const formGroupRowClassName =
    "flex flex-col gap-6 lg:flex-row-reverse lg:gap-6";
  return (
    <section>
      <h2 className="mb-6 font-bold text-2xl leading-[30px] text-gray-900">
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
  );
}
