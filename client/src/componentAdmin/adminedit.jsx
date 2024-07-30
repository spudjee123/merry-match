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
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    packages_name: "",
    merry_limit: "",
    icons: "",
    detail: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  // Fetch package data for editing
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

  // File upload
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image first");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    // File upload: Sending POST request with "multipart/form-data"
    try {
      const res = await axios.post(
        "http://localhost:4001/api/admin/uploadsAdmin",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUrl(res.data.data.secure_url);
      alert("Image uploaded successfully");
    } catch (err) {
      console.error("Error uploading the image", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
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
          icons: imageUrl,
          detail: details.join(", "),
        }
      );
      console.log("Response:", res);
      alert("Package updated successfully");
      navigate("/package/view");
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  const handleDetailChange = (index, value) => {
    const newDetails = [...details];
    newDetails[index] = value;
    setDetails(newDetails);
  };

  const handleDeleteDetail = (index) => {
    const newDetails = details.filter((_, i) => i !== index);
    setDetails(newDetails);
  };

  const handleDeletePackage = async () => {
    try {
      await axios.delete(
        `http://localhost:4001/admin/delete/${params.package_id}`
      );
      alert("Package deleted successfully");
      navigate("/package/view");
    } catch (error) {
      console.error("Error deleting package:", error);
    }
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

      <label className="w-full md:w-1/3">
        <div className="text-black">
          Icon <span className="text-red-600">*</span>
        </div>
        <div className="relative mt-2">
          {imageUrl ? (
            <div className="relative w-[130px] h-[100px]">
              <img
                className="w-[120px] h-[100px] rounded-[5px]"
                src={imageUrl}
                alt="Uploaded Icon"
              />
              <button
                className="absolute top-[-20px] right-[-20px]"
                onClick={() => setImageUrl("")}
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
                onChange={handleFileChange}
              />
            </>
          )}
        </div>
        <form onSubmit={handleUpload}>
          <button
            type="submit"
            className="bg-rose-100 text-red-600 py-2 px-4 rounded-full mt-2 w-[120px] font-bold"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </label>

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
              type="button"
              className="text-red-600 ml-4"
              onClick={() => handleDeleteDetail(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <footer className="border-t mt-4 pt-4">
        <button
          className="text-red-600"
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete this package?")
            ) {
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
