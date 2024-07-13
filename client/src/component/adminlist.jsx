import { useEffect } from "react";
import edit from "../assets/icons/edit.png"
import bin from "../assets/icons/bin.png"
import basic from "../assets/icons/basic.png"
import platinum from "../assets/icons/platinum.png"
import premium from "../assets/icons/premium.png"
import drag from "../assets/icons/drag.png"
import search from "../assets/icons/search.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

// const AdminPageList = () => {
//   const [packages, setPackages] = useState();
//   const [searchTerm, setSearchTerm] = useState('');

  const AdminPageList = () => {
    const [packages, setPackages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');



  async function getData() {
    let result = await axios.get("http://localhost:4001/admin/get")
    console.log(result);
    setPackages(result.data.packages);
  }



  const handleDelete = (id) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
    document.getElementById("delete").showModal()
  };

  const filteredPackages = packages.filter(pkg => 
    pkg.packages_name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/package/add')
  }

  const handleClickEdit = (id) => {
    navigate(`/package/edit/${id}`)
  }


useEffect(() => {
  getData()
},[])

  return (
    <section className="w-[90%] h-20 px-[60px] py-4 bg-white border-b border-gray-300 justify-start item-end inline-flex flex-col">
      <div className="flex flex-row">
        <div className="grow shrink basis-0 text-slate-800 text-2xl font-bold leading-[30px]">
          Merry Package
        </div>
        <div className="justify-start items-start gap-4 flex">
          <div className="h-12 bg-white rounded-lg border border-gray-300 justify-start items-center gap-2.5 flex">
            <div><img className="relative left-1" src={search} alt="" /></div>
            <input
              className="w-[320px] grow shrink basis-0 text-slate-400 text-base font-normal leading-normal h-10 bg-white "
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="px-6 py-3 bg-rose-700 rounded-[99px] shadow justify-center items-center gap-2 flex">
            <button className="text-center text-white text-base font-bold leading-normal" onClick={handleClick}>
              + Add Package
            </button>
          </div>
        </div>
      </div>

      <div className="flex grow shrink basis-0 self-stretch rounded-2xl flex-col mt-[100px]">
        <table className="self-stretch bg-gray-300 justify-start items-start inline-flex gap-[120px] rounded-t-lg">
          <thead>
            <tr className="h-[41px] px-4 py-2.5 flex gap-[150px] relative">
              <th className="grow shrink basis-0 text-justify text-slate-600 text-sm font-medium absolute left-[200px]">Icon</th>
              <th className="grow shrink basis-0 text-justify text-slate-600 text-sm font-medium absolute left-[350px]">Package_name</th>
              <th className="grow shrink basis-0 text-justify text-slate-600 text-sm font-medium absolute left-[620px]">Merry_limit</th>
              <th className="grow shrink basis-0 text-justify text-slate-600 text-sm font-medium absolute right-[-1100px]">Created_date</th>
              <th className="grow shrink basis-0 text-justify text-slate-600 text-sm font-medium absolute right-[-880px]">Updated_date</th>
              <th className="grow shrink basis-0 text-justify text-slate-600 text-sm font-medium absolute right-[-1300px] ">Action</th>
            </tr>
          </thead>
        </table>

        {filteredPackages.map((pkg) => (
          <div className="h-[88px] justify-start items-start flex" key={pkg.package_id}>
            <div className="self-stretch px-[11px] py-1 justify-center items-center flex">
              <img src={drag} alt="" />
            </div>
            <div className="h-[88px] justify-center items-center gap-2.5 flex">
              <div className="text-justify text-black text-base font-normal leading-normal mr-[90px] ml-1">{pkg.package_id}</div>
            </div>
            <div className="w-20 h-[88px] px-4 py-8 justify-start items-center gap-2.5 flex mr-[100px]">
              <div className="w-8 h-8 px-[3.20px] py-[4.80px] justify-center items-center flex">
                <img src={pkg.icons} alt="" />
              </div>
            </div>
            <div className="h-[88px] w-[70px] px-4 py-8 justify-start items-center gap-2.5 flex mr-[180px]">
              <div className="text-justify text-black text-base font-normal leading-normal">{pkg.packages_name}</div>
            </div>
            <div className="h-[88px] px-4 py-8 justify-start items-center gap-2.5 flex mr-[100px]">
              <div className="text-justify text-black text-base font-normal leading-normal">{pkg.merry_limit}</div>
            </div>
            <div className="h-[88px] px-4 py-8 justify-start items-center gap-2.5 flex mr-[50px]">
              <div className="text-justify text-black text-base font-normal leading-normal">{pkg.created_at}</div>
            </div>
            <div className="grow shrink basis-0 h-[88px] px-4 py-8 justify-start items-center flex">
              <div className="text-justify text-black text-base font-normal leading-normal">{pkg.updated_at}</div>
            </div>
            <div className="w-[120px] h-[88px] pl-[27px] pr-7 justify-center items-start flex">
              <div className="grow shrink basis-0 self-stretch px-[3px] py-[1.50px] justify-center items-center inline-flex">
                <button><img src={bin} alt="" onClick={() => handleDelete(pkg.package_id)} /></button>
              </div>
              <div className="grow shrink basis-0 self-stretch px-[3px] py-[1.50px] justify-center items-center inline-flex ml-2">
                <button onClick={() => handleClickEdit(pkg.package_id)} ><img src={edit} alt="" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <dialog id="delete" className="modal rounded-2xl lg:rounded-3xl p-0">
          <div className="modal-box p-0 shadow-primary">
            <div className="flex justify-between items-center h-14 px-6 py-2 border-b-2 m-0">
              <h3 className=" text-xl leading-6 font-semibold">
                Delete Confirmation
              </h3>

              <form method="dialog">
                <button className="btn btn-sm btn-square btn-ghost">
                  X
                </button>
              </form>
            </div>
            <div className=" p-4 lg:p-6 flex flex-col gap-6">
              <p className=" text-color-gray-700 leading-6">
                Do you sure to delete this package?
              </p>
              <div className=" flex flex-col lg:flex-row gap-4">
                <button className=" bg-color-red-100 px-6 py-3 max-lg:w-full rounded-[99px] text-color-red-600 leading-6 font-bold drop-shadow-secondary">
                  Yes, I want to delete
                </button>
                <form method="dialog">
                  <button className=" bg-color-red-500 px-6 py-3 max-lg:w-full rounded-[99px] text-white leading-6 font-bold drop-shadow-primary">
                    No, I don’t want
                  </button>
                </form>
              </div>
            </div>
          </div>
        </dialog>
    </section>


  );
};


export default AdminPageList;
