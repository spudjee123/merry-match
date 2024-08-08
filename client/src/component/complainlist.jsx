import React from "react";
import AdminPageSidebar from "./adminsidebar";
import search from "../assets/icons/search.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Ensure you have this imported

const ComplainList = () => {
  const [complaint, setComplaint] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const getComplaintList = async () => {
    try {
      const result = await axios.get("http://localhost:4001/complaint/list");
      console.log(result.data.userComplaint);
      setComplaint(result.data.userComplaint);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  useEffect(() => {
    getComplaintList();
  }, []);

  const filteredComplaints = complaint.filter((complaint) =>
    complaint.name.toLowerCase().includes(searchUser.toLowerCase())
  );

  const handleEditClick = async (id, status) => {

    if(status === "New") {
    await axios.put(`http://localhost:4001/admin/edit/complaint/${id}`, {status: "Pending"})
    }
    navigate(`/complaint/see/${id}`);

    
  };

  // const handleClickToPending = async () => {
  //   await axios.put(`http://localhost:4001/admin/edit/complaint/${complaint_id}`, {status: "Pending"})
  //   navigate("/complaint/list")
  // }

  return (
    <section className="px-4 py-4 bg-white border-b border-gray-300 flex">
      <div>
        <AdminPageSidebar />
      </div>

      <div className="flex flex-col w-screen ml-5">
        <div className="flex lg:flex-row justify-between items-center">
          <div className="text-slate-800 text-2xl font-bold mb-4 lg:mb-0">
            Complaint list
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg mr-2">
              <img className="p-2" src={search} alt="search icon" />
              <input
                className="w-[300px] p-2 text-slate-400 text-base bg-white"
                type="text"
                placeholder="Search..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
              />
            </div>
            <select className="select select-success w-full max-w-xs bg-white border-gray-300">
              <option disabled selected>
                All status
              </option>
              <option>One Piece</option>
              <option>Naruto</option>
              <option>Death Note</option>
              <option>Attack on Titan</option>
              <option>Bleach</option>
              <option>Fullmetal Alchemist</option>
              <option>Jojo's Bizarre Adventure</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto mt-6 rounded-t-lg">
          <table className="w-full">
            <thead>
              <tr className="h-12 bg-[#d6d9e4] text-slate-600 text-sm font-medium">
                <th className="px-4 text-left">User</th>
                <th className="px-4 text-left">Issue</th>
                <th className="px-4 text-left">Description</th>
                <th className="px-4 text-left">Date Submitted</th>
                <th className="px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => (
                <tr
                  className="h-12 bg-white text-black text-base"
                  key={complaint.complaint_id}
                >
                  <td className="px-4 text-left">{complaint.name}</td>
                  <td className="px-4 text-left">{complaint.issue}</td>
                  <td className="px-4 text-left">{complaint.description}</td>
                  <td className="px-4 text-left">{complaint.created_at}</td>
                  <td className="px-4 text-left">
                    <button
                      className={`px-1 py-1 bg-[#fff5d4] rounded-lg flex items-center ${complaint.status === "New" ? "bg-beige-100 text-beige-700" : complaint.status === "Resolved" ? "bg-green-100 text-green-500" : complaint.status === "Cancel" ? "bg-gray-200 text-gray-700" : "" }`}
                      onClick={() => handleEditClick(complaint.complaint_id,complaint.status)}
                    >
                      {complaint.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComplainList;