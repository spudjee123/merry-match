import React, { useState, useEffect } from "react";
import ImgUser1 from "../assets/images/mockupimguser1.png";
import LikeButton from "../assets/images/likebutton.png";
import DislikeButton from "../assets/images/dislikebutton.png";
import SeeProfile from "../assets/images/seeprofile.png";
import Heart from "../assets/images/heartmatchingpage.png";
import ImgUser2 from "../assets/images/mockupimguser2.png";
import ImgUser3 from "../assets/images/mockupimguser3.png";
import Avatar from "../assets/images/avatarmatchingpage.png";
import NavUser from "../pages/user-profile-management/navUser";
import { io } from "socket.io-client";
import Chat from "./Chat";
import axios from "axios";
import { useAuth } from "../context/auth";
import { useNavigate, useParams } from "react-router-dom";

const socket = io.connect("http://localhost:4001");

const MatchingChat = () => {
  const navigate = useNavigate();
  const { matchId } = useParams();
  // const [username, setUsername] = useState("");
  // const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]); // State for storing messages
  const [matchImages, setMatchImages] = useState([]);
  const [matchName, setMatchName] = useState([]);
  const [matchInfo, setMatchInfo] = useState([]);
  const { state } = useAuth();
  const userId = state.user?.user_id;
  const username = userId;
  const [clickId, setClickId] = useState(matchId);

  useEffect(() => {
    // เก็บข้อมูลทุกอย่าง
    const fetchMatchImages = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4001/merry/status/${userId}`
        );
        const image = result.data.image;
        const name = result.data.name;
        const info = result.data.data;
        console.log("abc", result);
        setMatchImages(image);
        setMatchName(name);
        setMatchInfo(info);
      } catch (error) {
        console.error("Error fetching match images:", error);
      }
    };
    fetchMatchImages();
  }, [userId]);

  // console.log(matchInfo);

  // const joinRoom = () => {
  //   if (username !== "" && room !== "") {
  //     socket.emit("join_room", room);
  //     // Load previous messages for the room
  //     socket.emit("loadMessages", room);
  //   }
  // };

  const handleClickToChat = (id) => {
    console.log(id);

    socket.emit("join_room", id);
    // Load previous messages for the room
    socket.emit("loadMessages", id);

    setClickId(id);
  };

  const handleNewMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]); // Update messages with new message
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (data) => {
      handleNewMessage(data);
    });

    // Receive previous messages
    socket.on("chat", (previousMessages) => {
      setMessages(previousMessages); // Set the previous messages in state
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
      socket.off("chat"); // Clean up chat listener
    };
  }, []);

  const handleClickToMatchingPage = () => {
    navigate("/matching");
  };

  return (
    <section className="bg-[#200009] w-full h-screen">
      <div className="lg:z-1000 lg:relative">
        <NavUser />
      </div>
      {/* mobile view */}
      <div className="w-screen h-screen relative lg:hidden">
        <div className="absolute">
          <img src={ImgUser1} alt="" className="h-[700px] rounded-b-3xl" />
          <div className="absolute bottom-0 left-0 w-full h-[250px]">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-purple-900 to-transparent opacity-90 rounded-b-3xl"></div>
          </div>
        </div>
        <div className="absolute top-[520px] left-0 right-0 bottom-0">
          <div className="px-4 py-2">
            <div className="flex flex-col mx-auto w-[90%] text-white">
              <div className="flex items-center justify-between">
                <div className="text-[40px] font-bold">Daeny 24</div>
                <div>
                  <img src={SeeProfile} alt="See profile" />
                </div>
              </div>
              <div>Bangkok, Thailand</div>
            </div>
          </div>
          <div className="flex justify-center items-center z-10 mt-5">
            <img
              src={DislikeButton}
              alt="Dislike button"
              className="cursor-pointer h-[100px] mx-4"
            />
            <img
              src={LikeButton}
              alt="Like button"
              className="cursor-pointer h-[100px] mx-4"
            />
          </div>
          <div className="flex justify-between w-[90%] text-white absolute z-20 bottom-[20px] left-[20px]">
            <div>Filter</div>
            <div>
              Merry limit today <span className="text-[#FF1659]">2/20</span>
            </div>
          </div>
        </div>
      </div>
      {/* desktop view */}
      <div className="lg:bg-white lg:h-full lg:w-full lg:flex hidden">
        {/* left container */}
        <div className="lg:w-[25%] border-2 flex flex-col items-center">
          <div
            className="lg:h-[30%] lg:w-full border-2 flex justify-center items-center cursor-pointer"
            onClick={handleClickToMatchingPage}
          >
            <div className="lg:h-[80%] lg:w-[95%] lg:bg-[#F6F7FC] lg:rounded-xl lg:border lg:hover:border-[#A62D82] lg:flex lg:flex-col lg:justify-center lg:items-center lg:text-center">
              <img src={Heart} alt="Heart Icon" />
              <h2 className="lg:text-[#95002B] lg:text-[20px] lg:font-bold">
                Discover New Match
              </h2>
              <p className="lg:text-[#646D89] lg:text-[12px]">
                Start finding and connect with new friends!
              </p>
            </div>
          </div>
          <div
            id="match-container"
            className="lg:h-[25%] lg:w-full border-2 lg:flex lg:justify-center lg:items-center"
          >
            <div className="lg:w-[95%]">
              <h2 className="lg:text-[#2A2E3F] lg:font-semibold">
                Merry Match!
              </h2>
              <div className="lg:flex lg:gap-5 lg:mt-[10px] overflow-x-auto overflow-y-auto max-h-[400px] max-w-[800px] cursor-pointer">
                {matchImages.map((item, index) => {
                  return (
                    <img
                      key={index}
                      className="h-[100px] w-[100px] rounded-[24px]"
                      src={item}
                      alt="img_user"
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="lg:h-[45%] lg:w-full border-2 lg:flex lg:justify-center lg:items-start">
            <div className="lg:w-[95%] lg:mt-[25px]">
              <h2 className="lg:text-[#2A2E3F] lg:font-semibold">
                Chat with Merry Match
              </h2>
              {matchInfo.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`lg:flex lg:mt-[15px] lg:gap-5 ${
                      item.id === clickId
                        ? "cursor-pointer active:border active:border-purple-500 hover:bg-gray-100 p-2 rounded-xl"
                        : "cursor-pointer active:border active:border-purple-500 hover:bg-gray-100 p-2 rounded-xl"
                    }`}
                    onClick={() => {
                      handleClickToChat(item.id);
                    }}
                  >
                    <img
                      className="h-[60px] w-[60px] rounded-[40px]"
                      src={item.image}
                      alt="user_chat"
                    />
                    <div>
                      <h1 className="lg:text-[16px] lg:text-[#2A2E3F]">
                        {item.name}
                      </h1>
                      <p className="lg:text-[12px] lg:text-[#646D89]">
                        You know nothing {item.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* right container */}
        <div className="bg-[#200009] lg:w-[80%] lg:flex lg:flex-col lg:justify-end lg:items-end">
          {/* chat box */}
          <div className="lg:w-full lg:mx-auto lg:overflow-hidden">
            <div className="lg:w-[90%] mx-auto flex flex-col lg:h-[600px] lg:overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 py-[10px] px-[25px] rounded-xl lg:w-[500px] ${
                    message.username === username
                      ? "bg-[#7D2262] text-white self-end"
                      : "bg-[#EFC4E2] text-black self-start"
                  }`}
                >
                  <div className="font-bold">{message.username}</div>
                  <div>{message.message}</div>
                  {/* แปลงเวลาให้อ่านง่าย */}
                  <div className="text-xs text-black">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                  {/* เรียกรูปมาแสดงถ้ามีไฟล์รูป */}
                  {message.img &&
                    message.img.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt="Uploaded"
                        className="mt-2 rounded-lg"
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>
          {/* input */}
          <div className="lg:w-[90%] mx-auto">
            {/* ช่องพิมพ์ข้อความ */}
            <div className="lg:w-full ">
              <Chat
                socket={socket}
                username={username}
                room={clickId}
                onNewMessage={handleNewMessage}
                messages={messages} // ส่ง messages ไปยัง Chat component
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatchingChat;
