import React from "react";
import AdminPageSidebar from "./adminsidebar";

const SeeComplaintDetail = () => {
    return (
    <section className="px-4 py-4 bg-white border-b border-gray-300 flex ">
    <div className="">
      <AdminPageSidebar />
    </div>

<div className="flex flex-col w-screen ml-5">
<div className="w-[1200px] h-20 px-[60px] py-4 bg-white border-b border-[#d6d9e4] justify-between items-center inline-flex">
  <div className="justify-start items-center gap-4 flex">
    <div className="w-6 h-6 relative" />
    <div className="justify-start items-center gap-4 flex">
      <div className="text-[#2a2e3f] text-2xl font-bold font-['Nunito'] leading-[30px]">I was insulted by Ygritte</div>
      <div className="px-2.5 py-1 bg-[#fff5d4] rounded-lg justify-start items-start gap-2.5 flex">
        <div className="text-[#393735] text-xs font-medium font-['Nunito'] leading-[18px]">Pending</div>
      </div>
    </div>
  </div>
  <div className="justify-start items-center gap-4 flex">
    <div className="px-2 py-1 rounded-2xl justify-center items-center gap-2 flex">
      <div className="text-[#c70039] text-base font-bold font-['Nunito'] leading-normal">Cancel Complaint</div>
    </div>
    <div className="px-6 py-3 bg-[#c70039] rounded-[99px] shadow justify-center items-center gap-2 flex">
      <div className="text-center text-white text-base font-bold font-['Nunito'] leading-normal">Resolve Complaint</div>
    </div>
  </div>
</div>
<div className="w-[1200px] h-[944px] relative bg-[#f5f7fb]">
  <div className="h-[500px] px-[100px] pt-10 pb-[60px] left-[60px] top-[40px] absolute bg-white rounded-2xl border border-[#e6e7eb] flex-col justify-start items-start gap-10 inline-flex">
    <div className="self-stretch justify-start items-center gap-2 inline-flex">
      <div className="text-[#646c89] text-xl font-semibold font-['Nunito'] leading-[30px]">Complaint by:</div>
      <div className="w-[880px] text-black text-base font-normal font-['Nunito'] leading-normal">Jon Snow</div>
    </div>
    <div className="self-stretch h-[0px] border border-[#e4e6ed]"></div>
    <div className="flex-col justify-start items-start gap-2 flex">
      <div className="w-[880px] text-[#646c89] text-xl font-semibold font-['Nunito'] leading-[30px]">Issue</div>
      <div className="w-[880px] text-black text-base font-normal font-['Nunito'] leading-normal">I was insulted by Ygritte</div>
    </div>
    <div className="flex-col justify-start items-start gap-2 flex">
      <div className="w-[880px] text-[#646c89] text-xl font-semibold font-['Nunito'] leading-[30px]">Description</div>
      <div className="w-[880px] text-black text-base font-normal font-['Nunito'] leading-normal">Hello, there was a ploblem with user ‘Ygritte’ who insult me.<br/>Can you check her out?</div>
    </div>
    <div className="flex-col justify-start items-start gap-2 flex">
      <div className="w-[880px] text-[#646c89] text-xl font-semibold font-['Nunito'] leading-[30px]">Date Submitted</div>
      <div className="w-[880px] text-black text-base font-normal font-['Nunito'] leading-normal">12/02/2022</div>
    </div>
  </div>
</div>

</div>

    </section>
    )
}

export default SeeComplaintDetail