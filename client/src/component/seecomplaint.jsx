import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminPageSidebar from "./adminsidebar";
import backicon from "../assets/icons/back-vector-icon.png";

const SeeComplaintDetail = () => {
  const navigate = useNavigate();
  const { complaint_id } = useParams();
  const [complaint, setComplaint] = useState(null);
  // const [status, setStatus] = useState("")

  const handleClickToComplaint = () => {
    navigate("/complaint/list");
  };

  const getComplaintDetail = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4001/admin/get/complaint/${complaint_id}`
      );
      console.log("result", result);

      setComplaint(result.data.data);
    } catch (error) {
      console.error("Error fetching complaint detail:", error);
    }
  };

  useEffect(() => {
    getComplaintDetail();
  }, [complaint_id]);

  // const updateComplaint = async () => {
  //   try {
  //     const result = await axios.put(`http://localhost:4001/admin/edit/complaint/${complaint_id}`)

  //   }
  // }

  const handleClickToResolved = async () => {
    await axios.put(
      `http://localhost:4001/admin/edit/complaint/${complaint_id}`,
      { status: "Resolved" }
    );
    navigate("/complaint/list");
  };

  const handleClickToCancel = async () => {
    await axios.put(
      `http://localhost:4001/admin/edit/complaint/${complaint_id}`,
      { status: "Cancel" }
    );
    navigate("/complaint/list");
  };

  console.log(complaint);
  if (!complaint) {
    return <div>Loading...</div>;
  }

  return (
    <section className="h-screen px-4 bg-white border-b border-gray-300 flex">
      <div>
        <AdminPageSidebar />
      </div>
      <div className="flex flex-col w-screen ml-5">
        <div className="px-4 lg:px-[60px] py-4 bg-white border-b border-[#d6d9e4] flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={handleClickToComplaint}>
              <img src={backicon} alt="Back" />
            </button>
            <div className="text-[#2a2e3f] text-xl lg:text-2xl font-bold">
              {complaint.issue}
            </div>
            <div className={`px-2.5 py-1 bg-[#fff5d4] rounded-lg flex items-center ${complaint.status === "New" ? "bg-beige-100 text-beige-700" : complaint.status === "Resolved" ? "bg-green-100 text-green-500" : complaint.status === "Cancel" ? "bg-gray-200 text-gray-700" : "" }`}
                      onClick={() => handleEditClick(complaint.complaint_id,complaint.status)}>
              <div className="text-[#393735] text-xs font-medium">
                {complaint.status}
              </div>
            </div>
          </div>
          <div className={`flex items-center gap-4 ${complaint.status !== "Pending" ? "invisible" : "visible"}`}>
            <button
              className="px-2 py-1 rounded-2xl flex items-center"
              onClick={handleClickToCancel}
            >
              <div className="text-[#c70039] text-base font-bold">
                Cancel Complaint
              </div>
            </button>
            <button
              className="px-6 py-3 bg-[#c70039] rounded-[99px] shadow flex items-center"
              onClick={handleClickToResolved}
            >
              <div className="text-center text-white text-base font-bold">
                Resolve Complaint
              </div>
            </button>
          </div>
        </div>
        <div className="w-full lg:w-[1200px] h-auto lg:h-[944px] bg-white">
          <div className="px-4 lg:px-[100px] pt-10 pb-[60px] m-4 lg:m-[60px] bg-white rounded-2xl border border-[#e6e7eb] flex flex-col gap-10">
            <div className="flex items-center gap-2">
              <div className="text-[#646c89] text-xl font-semibold">
                Complaint by:
              </div>
              <div className="text-black text-base font-normal">
                {complaint.name}
              </div>
            </div>
            <div className="border-t border-[#e4e6ed]"></div>
            <div className="flex flex-col gap-2">
              <div className="text-[#646c89] text-xl font-semibold">Issue</div>
              <div className="text-black text-base font-normal">
                {complaint.issue}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[#646c89] text-xl font-semibold">
                Description
              </div>
              <div className="text-black text-base font-normal">
                {complaint.description}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[#646c89] text-xl font-semibold">
                Date Submitted
              </div>
              <div className="text-black text-base font-normal">
                {new Date(complaint.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeeComplaintDetail;
