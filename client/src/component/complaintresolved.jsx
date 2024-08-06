import React from "react";
import { useNavigate } from "react-router-dom";
import AdminPageSidebar from "./adminsidebar";
import backicon from "../assets/icons/back-vector-icon.png"


const ComplaintResolved = () => {
    const navigate = useNavigate();

    const handleClickToCompalint = () => {
        navigate("/complaint/list");
      };

    return (
        <section className="้ h-screen px-4 bg-white border-b border-gray-300 flex">
            <div className="">
                <AdminPageSidebar />
            </div>
            <div className="flex flex-col w-screen ml-5 ">
                <div className="px-4 lg:px-[60px] py-4 bg-white border-b border-[#d6d9e4] flex justify-between items-center">
                    <div className="flex items-center gap-4">
                    <button><img src={backicon} alt="" onClick={handleClickToCompalint} /></button>
                        <div className="text-[#2a2e3f] text-xl lg:text-2xl font-bold f">I was insulted by Ygritte</div>
                        <div className="px-2.5 py-1 bg-[#fff5d4] rounded-lg flex items-center">
                            <div className="text-[#393735] text-xs font-medium  ">Resolved</div>
                        </div>
                    </div>
                    
                </div>
                <div className="w-full lg:w-[1200px] h-auto lg:h-[944px]  bg-white">
                    <div className="px-4 lg:px-[100px] pt-10 pb-[60px] m-4 lg:m-[60px] bg-white rounded-2xl border border-[#e6e7eb] flex flex-col gap-10">
                        <div className="flex items-center gap-2">
                            <div className="text-[#646c89] text-xl font-semibold ">Complaint by:</div>
                            <div className="text-black text-base font-normal ">Jon Snow</div>
                        </div>
                        <div className="border-t border-[#e4e6ed]"></div>
                        <div className="flex flex-col gap-2">
                            <div className="text-[#646c89] text-xl font-semibold ">Issue</div>
                            <div className="text-black text-base font-normal ">I was insulted by Ygritte</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-[#646c89] text-xl font-semibold ">Description</div>
                            <div className="text-black text-base font-normal ">Hello, there was a problem with user ‘Ygritte’ who insulted me.<br />Can you check her out?</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-[#646c89] text-xl font-semibold ">Date Submitted</div>
                            <div className="text-black text-base font-normal ">12/02/2022</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ComplaintResolved;