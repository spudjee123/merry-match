import { useEffect } from "react";
import drag from "../assets/icons/drag.png";
import X from "../assets/icons/X.png";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AdminEditPackagePage = () => {
  const [image, setImage] = useState(null);
  const [details, setDetails] = useState([""]);
  const [packageName, setPackageName] = useState("");
  const [merryLimit, setMerryLimit] = useState("");
  const [inputs, setInputs] = useState({
    packages_name: "",
    merry_limit: "",
    icons: "",
    detail: "",
  });

  const params = useParams();
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4001/admin/get/${params.package_id}`
        );

        const packageData = res.data.data;

        setInputs({
          packages_name: packageData.packages_name,
          merry_limit: packageData.merry_limit,
          icons: packageData.icons,
          detail: Array.isArray(packageData.detail)
            ? packageData.detail.join(", ")
            : packageData.detail,
        });
        setPackageName(packageData.packages_name);
        setMerryLimit(packageData.merry_limit);
        setDetails(
          Array.isArray(packageData.detail)
            ? packageData.detail
            : packageData.detail.split(", ").map((item) => item.trim())
        );
      } catch (error) {
        console.error("Error fetching package data:", error);
      }
    };

    if (params.package_id) {
      fetchPackage();
    } else {
      console.error("No package_id found in params");
    }
  }, [params]);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericMerryLimit = parseInt(inputs.merry_limit, 10);

    if (isNaN(numericMerryLimit)) {
      console.error("Merry limit is not a valid number");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:4001/admin/edit/${params.package_id}`,
        {
          packages_name: inputs.packages_name,
          merry_limit: numericMerryLimit,
          icons: inputs.icons,
          detail: inputs.detail,
        }
      );
      console.log("Response:", res);
      navigate("/package/view"); // Navigate to the package view page after successful edit
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
      } else {
        console.error("Error updating package data:", error.message);
      }
    }
  };

  const handleAddDetail = () => {
    setDetails([...details, ""]);
  };

  const handleDeleteDetail = (index) => {
    if (details.length > 1) {
      const newDetails = details.filter((_, i) => i !== index);
      setDetails(newDetails);
    } else {
      alert("You must have at least one detail.");
    }
  };

  const handleDetailChange = (index, value) => {
    const newDetails = [...details];
    newDetails[index] = value;
    setDetails(newDetails);
  };

  const handleDeletePackage = () => {
    setImage(null);
    setDetails([""]);
    setPackageName("");
    setMerryLimit("");
  };

  const handleClick = () => {
    navigate("/package/view");
  };

  return (
    <section className="w-[90%] mx-auto px-6 py-4 bg-white border-b border-gray-300 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xl font-bold text-gray-800">Edit Package</div>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-rose-100 text-rose-800 rounded-full font-bold hover:bg-rose-200"
            onClick={handleClick}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-rose-700 text-white rounded-full font-bold hover:bg-rose-800"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="text-lg text-black">
            Package Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={packageName}
            name="packages_name"
            onChange={(e) => {
              handleChange(e);
              setPackageName(e.target.value);
            }}
            className="input input-bordered bg-white"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg text-black">
            Merry limit <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            value={merryLimit}
            name="merry_limit"
            onChange={(e) => {
              handleChange(e);
              setMerryLimit(e.target.value);
            }}
            className="input input-bordered bg-white"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block mb-2 text-lg text-black">
          Icon <span className="text-red-600">*</span>
        </label>
        <div className="relative">
          {image ? (
            <div className="w-32 h-32">
              <img
                className="w-full h-full rounded-lg"
                src={URL.createObjectURL(image)}
              />
              <button
                className="absolute top-0 right-0 p-2 bg-white rounded-full"
                onClick={() => setImage(null)}
                type="button"
              >
                <img src={X} alt="Remove Icon" />
              </button>
            </div>
          ) : (
            <>
              <div className="w-32 h-32 bg-[#f6f7fc] flex items-center justify-center rounded-lg">
                <p>Upload Icon</p>
              </div>
              <input
                type="file"
                className="hidden"
                name="icons"
                onChange={(event) => {
                  handleChange(event);
                  setImage(event.target.files[0]);
                }}
              />
            </>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h1 className="text-lg font-bold">Package Detail</h1>
        {details.map((detail, index) => (
          <div key={index} className="flex items-center mt-4">
            <img className="w-6 h-6 mr-2" src={drag} alt="Drag Icon" />
            <input
              type="text"
              value={detail}
              onChange={(e) => handleDetailChange(index, e.target.value)}
              className="input input-bordered bg-white flex-1"
            />
            <button
              className="text-red-600 ml-4"
              onClick={() => handleDeleteDetail(index)}
            >
              Delete
            </button>
          </div>
        ))}
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-rose-100 text-rose-800 rounded-full font-bold hover:bg-rose-200"
            onClick={handleAddDetail}
          >
            + Add detail
          </button>
        </div>
      </div>

      <footer className="border-t mt-4 pt-4">
        <button
          className="text-red-600"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this package?")) {
              handleDeletePackage();
            }
          }}
        >
          Delete Package
        </button>
      </footer>
    </section>
  );
};

export default AdminEditPackagePage;
