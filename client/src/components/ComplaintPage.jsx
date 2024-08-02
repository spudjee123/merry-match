import React, { useState } from "react";
import NavUser from "../pages/user-profile-management/navUser";
import Img from "../assets/images/loginpage.png";
import Footer from "./Footer";
import { useAuth } from "../context/auth";
import axios from "axios";

const ComplaintPage = () => {

  const {state} = useAuth()

  
    const [textInput,setTextInput] = useState({
        issue:"",
        description:"",
        
    })

    const handleChange = (e) => {
        setTextInput((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));  
      };
// console.log(textInput);

// กดsubmitเพื่อส่งข้อมูล Complaint ไป supabase
const handleSubmit = async (e) => {
  e.preventDefault();

  // check user_id
  const userId = state.user?.user_id;

  // check name
  const nameUser = state.user?.name;

  // ตรวจสอบว่าข้อมูล textInput มีค่าหรือไม่
  const { issue, description } = textInput;

  if (!userId || !issue || !description) {
    alert("Please fill in all the required fields.");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:4001/user/complaint",
      {
        user_id: userId,
        name: nameUser, 
        issue: issue,
        description: description,
        status: "", 
      }
    );
    console.log("Response:", res);
    alert("Send Complaint message successfully");
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
    } else {
      console.error("An error occurred:", error);
    }
  }
};


  return (
    <section className="bg-white h-full w-screen pt-[120px] lg:pt-[150px]">
      <div>
        <NavUser />
      </div>
      <div className="lg:flex lg:flex-row-reverse lg:max-w-[70%] lg:mb-[250px] lg:mx-auto">
        <div className="lg:w-[40%]">
          <img src={Img} alt="" className="h-[280px] w-[180px] mx-auto lg:w-[450px] lg:h-[675px]" />
        </div>
        <div className="w-[90%] mx-auto mt-[60px] lg:w-[45%] lg:ml-0">
          <div className="mb-[40px] lg:w-full">
            <p className="text-tagline text-[#7B4429]">COMPLAINT</p>
            <h2 className="text-headline3 text-[#A62D82] lg:text-headline2">
              if you have any trouble Don't be afraid to tell us!
            </h2>
          </div>
          <div className="mb-[40px]">
            <p className="text-black text-body2">Issue</p>
            <input
              placeholder="Issue..."
              type="text"
              name="issue"
              id=""
              value={textInput.issue}
              onChange={handleChange}
              className="w-full rounded-lg h-[48px] bg-white border border-[#D6D9E4] px-[10px]"
            />
          </div>
          <div className="mb-[40px]">
            <p className="text-black text-body2">descriptionription</p>
            <textarea
              placeholder="description..."
              name="description"
              id=""
              value={textInput.description}
              onChange={handleChange}
              className="w-full rounded-lg h-[140px] bg-white border border-[#D6D9E4] px-[10px] pt-[10px] text-left align-text-top"
            />
          </div>
          <button className="bg-[#C70039] rounded-full w-full text-white h-[50px] mb-[40px] lg:w-[200px]" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </section>
  );
};

export default ComplaintPage;
