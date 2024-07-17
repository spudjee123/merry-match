import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import drag from "../assets/icons/drag.png";
import X from "../assets/icons/X.png";

const AdminAddPackagePage = () => {
  const [image, setImage] = useState(null);
  const [details, setDetails] = useState([""]);
  const [inputs, setInputs] = useState({
    packages_name: "",
    merry_limit: "",
    icons: "",
    detail: "",
  });
// การเพิ่มข้อมูลในช่อง input 
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  // เมื่อadd เสร็จจะเพิ่มข้อมูลและกลับไปยังหน้าlist 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4001/admin/create", {
        ...inputs,
        details,
      });
      console.log(res);
      navigate("/package/view"); 
    } catch (error) {
      console.error("Error creating package:", error);
    }
  };

  // กดปุ่ม + Add detail จะเพิ่มช่องให้เขียน detial เพิ่ม 
  const handleAddDetail = () => {
    setDetails([...details, ""]);
  };

  // ลบ detail
  const handleDeleteDetail = (index) => {
    const newDetails = details.filter((_, i) => i !== index);
    setDetails(newDetails);
  };

  // เก็บข้อมูลdetail เพื่อส่งต่อไปยัง data base
  const handleDetailChange = (index, value) => {
    const newDetails = [...details];
    newDetails[index] = value;
    setDetails(newDetails);
  };

  const handleClick = () => {
    navigate("/package/view");
  };

  return (
    <section className="w-full h-auto px-6 py-4 bg-white border-b border-gray-300 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="text-slate-800 text-2xl font-bold">Add Package</div>
        <div className="flex gap-4">
          <button
            className="px-6 py-3 bg-rose-100 rounded-full shadow text-rose-800 font-bold"
            onClick={handleClick}
          >
            Cancel
          </button>
          <button
          id=""
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-3 bg-rose-700 rounded-full shadow text-white font-bold"
          >
            Create
          </button>
        </div>
      </div>

      <div className="mt-10 flex flex-col space-y-6">
        <label className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <p className="text-black">Package Name <span className="text-red-600">*</span></p>
            <input
              type="text"
              name="packages_name"
              className="input input-bordered bg-white w-full"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-black">Merry limit <span className="text-red-600">*</span></p>
            <input
              type="number"
              name="merry_limit"
              className="input input-bordered bg-white w-full"
              onChange={handleChange}
            />
          </div>
          
        </label>

        <label className="w-full md:w-1/3">
          <div className="text-black">Icon <span className="text-red-600">*</span></div>
          <div className="relative mt-2">
            {image ? (
              <div className="relative w-[130px] h-[100px]">
                <img
                  className="w-[120px] h-[100px] rounded-[5px]"
                  src={URL.createObjectURL(image)}
                  alt="Uploaded Icon"
                />
                <button
                  className="absolute top-[-20px] right-[-20px]"
                  onClick={() => setImage(null)}
                  type="button"
                >
                  <img src={X} alt="Delete Icon" />
                </button>
              </div>
            ) : (
              <>
                <div className="absolute w-[120px] h-[100px] top-0 left-0 bg-[#f6f7fc] flex justify-center items-center rounded-[5px]">
                  <p>Upload Icon</p>
                </div>
                <input
                  type="file"
                  className="input input-bordered bg-white w-[120px] h-[100px] opacity-0"
                  name="icons"
                  onChange={(event) => {
                    handleChange(event);
                    setImage(event.target.files[0]);
                  }}
                />
              </>
            )}
          </div>
        </label>

        <label className="form-control w-full">
          <h1 className="text-black">Package Detail</h1>
          {details.map((detail, index) => (
            <div key={index} className="flex flex-col mt-4">
              <p className="relative left-4 text-black">
                Detail <span className="text-red-600">*</span>
              </p>
              <div className="flex items-center">
                <img className="mr-2" src={drag} alt="Drag Icon" />
                <input
                  type="text"
                  value={detail}
                  name={`detail_${index}`}
                  onChange={(e) => handleDetailChange(index, e.target.value)}
                  className="input input-bordered bg-white w-full"
                />
                <button
                  className="ml-4 text-red-600"
                  onClick={() => handleDeleteDetail(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="px-[50px] flex-col justify-start items-start gap-2 flex mb-2 relative right-14">
            <button id="add-detail"
              className="px-6 py-3 bg-rose-100 rounded-[99px] shadow justify-center items-center gap-2 inline-flex"
              onClick={handleAddDetail}
            >
              <div className="text-center text-rose-800 text-base font-bold font-['Nunito'] leading-normal">
                + Add detail
              </div>
            </button>
          </div>
        </label>
      </div>
    </section>
  );
};

export default AdminAddPackagePage;
