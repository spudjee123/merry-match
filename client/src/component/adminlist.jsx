import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import basic from "../assets/icons/basic.png";
import platinum from "../assets/icons/platinum.png";
import premium from "../assets/icons/premium.png";
import edit from "../assets/icons/edit.png";
import bin from "../assets/icons/bin.png";
import drag from "../assets/icons/drag.png";
import search from "../assets/icons/search.png";
// import { useAuth } from "../context/auth";


const AdminPageList = () => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletePackageId, setDeletePackageId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
// const {state} = useAuth()

// console.log(state);

  const navigate = useNavigate();

  // ดึงข้อมูลจาก data base
  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.get("http://localhost:4001/admin/get");
      setPackages(result.data.packages);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setError("Failed to fetch packages.");
    } finally {
      setLoading(false);
    }
  };

  // กดเพื่อลบ package
   const handleDeleteClick = (id) => {
    setDeletePackageId(id);
    setIsDeleteDialogOpen(true);
  };

  // ยืนยันการลบ package
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:4001/admin/delete/${deletePackageId}`);
      setPackages(packages.filter(pkg => pkg.package_id !== deletePackageId));
    } catch (error) {
      console.error("Error deleting package:", error);
      setError("Failed to delete package.");
    }
    setIsDeleteDialogOpen(false);
  };

  // เอาข้อมูลที่ดึงมาจาก data base ไป .map เพื่อไปแสดงผล
  const filteredPackages = packages.filter(pkg => 
    pkg.packages_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
// link ot addpackage page
  const handleAddClick = () => {
    navigate('/package/add');
  };
// link ot addpackage edit page by
  const handleEditClick = (id) => {
    navigate(`/package/edit/${id}`);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="lg:w-[85%] px-4 py-4 bg-white border-b border-gray-300 mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="text-slate-800 text-2xl font-bold leading-[30px] mb-4 lg:mb-0">
          Merry Package
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <img className="p-2" src={search} alt="search icon" />
            <input
              className="w-full p-2 text-slate-400 text-base bg-white"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-6 py-3 bg-rose-700 rounded-full text-white font-bold" onClick={handleAddClick}>
            + Add Package
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mt-6 rounded-t-lg">
        <table className="w-full">
          <thead>
            <tr className="h-12 bg-[#d6d9e4] text-slate-600 text-sm font-medium">
              <th className="px-4 text-left"></th>
              <th className="px-4 text-left"></th>
              <th className="px-4 text-left">Icon</th>
              <th className="px-4 text-left">Package Name</th>
              <th className="px-4 text-left">Merry Limit</th>
              <th className="px-4 text-left">Created Date</th>
              <th className="px-4 text-left">Updated Date</th>
              <th className="px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPackages.map((pkg) => (
              <tr key={pkg.package_id} className="h-12 bg-white text-black text-base">
                <td className="px-4 text-left"><img src={drag} alt="drag icon" /></td>
                <td className="px-4 text-left">{pkg.package_id}</td>
                <td className="px-4 text-left"><img src={pkg.icons} alt="package icon" /></td>
                <td className="px-4 text-left">{pkg.packages_name}</td>
                <td className="px-4 text-left">{pkg.merry_limit}</td>
                <td className="px-4 text-left">{pkg.created_at}</td>
                <td className="px-4 text-left">{pkg.updated_at}</td>
                <td className="px-4 text-left">
                  <button onClick={() => handleDeleteClick(pkg.package_id)}><img src={bin} alt="Delete" /></button>
                  <button onClick={() => handleEditClick(pkg.package_id)}><img src={edit} alt="Edit" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDeleteDialogOpen && (
        <dialog id="delete" className="modal rounded-2xl lg:rounded-3xl p-0" open>
          <div className="modal-box p-0 shadow-primary">
            <div className="flex justify-between items-center h-14 px-6 py-2 border-b-2 m-0">
              <h3 className=" text-xl leading-6 font-semibold">
                Delete Confirmation
              </h3>
              <button className="btn btn-sm btn-square btn-ghost" onClick={() => setIsDeleteDialogOpen(false)}>
                X
              </button>
            </div>
            <div className="p-4 lg:p-6 flex flex-col gap-6">
              <p className="text-color-gray-700 leading-6">
                Are you sure you want to delete this package?
              </p>
              <div className="flex flex-col lg:flex-row gap-4">
                <button onClick={handleConfirmDelete} className="bg-color-red-100 px-6 py-3 max-lg:w-full rounded-[99px] text-color-red-600 leading-6 font-bold drop-shadow-secondary">
                  Yes, I want to delete
                </button>
                <button onClick={() => setIsDeleteDialogOpen(false)} className="bg-color-red-500 px-6 py-3 max-lg:w-full rounded-[99px] text-white leading-6 font-bold drop-shadow-primary">
                  No, I don’t want
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
};

export default AdminPageList;
