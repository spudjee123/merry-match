import React from "react";
import { useNavigate } from "react-router-dom";
import AdminPageSidebar from "./adminsidebar";
import search from "../assets/icons/search.png";

const ComplainList = () => {
  return (

    
    <section className="px-4 py-4 bg-white border-b border-gray-300 flex ">
      <div className="">
        <AdminPageSidebar />
      </div>

      <div className="flex flex-col w-screen ml-5">
        <div className="flex lg:flex-row justify-between items-center">
          <div className="text-slate-800 text-2xl font-bold mb-4 lg:mb-0">
            Complian list
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg mr-2">
              <img className="p-2" src={search} alt="search icon" />
              <input
                className="w-[300px] p-2 text-slate-400 text-base bg-white"
                type="text"
                placeholder="Search..."
              />
            </div>
            <select className="select select-success w-full max-w-xs bg-white  border-gray-300 ">
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
              <tr className="h-12 bg-[#d6d9e4] text-slate-600 text-sm font-medium ">
                <th className="px-4 text-left">User</th>
                <th className="px-4 text-left">Issue</th>
                <th className="px-4 text-left">Description</th>
                <th className="px-4 text-left">Date Submitted</th>
                <th className="px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr  className="h-12 bg-white text-black text-base">
                <td className="px-4 text-left">Jon Snow</td>
                <td className="px-4 text-left">i was something</td>
                <td className="px-4 text-left">Hi, Lorem ipsum dolor sit amet.</td>
                <td className="px-4 text-left">12/02/2022</td>
                <td className="px-4 text-left">New</td>
               
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComplainList;
