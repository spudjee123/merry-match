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

const socket = io.connect("http://localhost:4001");

const MatchingChat = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]); // New state for storing messages

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("Join_room", room);
    }
  };

  const handleNewMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("receive_message", (data) => {
      handleNewMessage(data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receive_message");
    };
  }, []);

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
        <div className="lg:w-[20%]">
          <div className="lg:w-full">
            <div className="lg:h-[30%] lg:w-full flex justify-center items-center lg:py-[30px]">
              <div className="lg:h-[80%] lg:w-[95%] lg:rounded-xl lg:border lg:border-[#A62D82] lg:flex lg:flex-col lg:justify-center lg:items-center lg:text-center">
                <div>
                  <img src={Heart} alt="" />
                </div>
                <div className="lg:w-[90%] lg:mb-[10px]">
                  <h2 className="lg:text-[#95002B] lg:text-[20px] lg:font-bold">
                    Discover New Match
                  </h2>
                </div>
                <div className="lg:w-[85%] lg:py-[10px]">
                  <p className="lg:text-[#646D89] lg:text-[12px]">
                    Start find and Merry to get know and connect with new
                    friend!
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:h-[25%] lg:w-full lg:flex lg:justify-center lg:items-center">
              <div className="lg:w-[95%]">
                <div>
                  <h2 className="lg:text-[#2A2E3F] lg:font-semibold">
                    Merry Match!
                  </h2>
                </div>
                <div className="lg:flex lg:gap-5 lg:mt-[10px]">
                  <div className="lg:w-[80px]">
                    <img src={ImgUser2} alt="ImgUser2" />
                  </div>
                  <div className="lg:w-[80px]">
                    <img src={ImgUser3} alt="ImgUser3" />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:h-[45%] lg:w-full lg:flex lg:justify-center lg:items-start">
              <div className="lg:w-[95%]">
                <div className="lg:mt-[25px]">
                  <h2 className="lg:text-[#2A2E3F] lg:font-semibold">
                    Chat with Merry Match
                  </h2>
                </div>
                <div className="lg:flex lg:mt-[15px] lg:gap-5">
                  <div>
                    <img src={Avatar} alt="" />
                  </div>
                  <div>
                    <div>
                      <h1 className="lg:text-[16px] lg:text-[#2A2E3F]">
                        Ygritte
                      </h1>
                    </div>
                    <div>
                      <p className="lg:text-[12px] lg:text-[#646D89]">
                        You know nothing Jon Snow
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* right container */}
        <div className="bg-[#200009] lg:w-[80%] lg:flex lg:flex-col lg:justify-end lg:items-end">
          {/* chat box */}
          <div className="lg:w-full lg:mx-auto lg:overflow-hidden">
            <div className="lg:w-[90%] mx-auto flex flex-col lg:h-[670px] lg:overflow-y-auto">
              {messages.map((message, index) => {
                console.log(message); // ตรวจสอบค่าของ message
                return (
                  <div
                    key={index}
                    className={`mb-2 py-[10px] px-[25px] rounded-xl lg:w-[500px] ${
                      message.author === username
                        ? "bg-[#7D2262] text-white self-end"
                        : "bg-[#EFC4E2] text-black self-start"
                    }`}
                  >
                    <div className="font-bold">{message.author}</div>
                    <div>{message.message}</div>
                    <div className="text-xs text-black">{message.time}</div>
                    {message.img && (
                      <img
                        src={message.img}
                        alt="Uploaded"
                        className="mt-2 rounded-lg"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* input */}
          <div className="lg:w-[90%] mx-auto">
            <div className="lg:h-[50px] lg:w-full">
              <input
                placeholder="My name..."
                type="text"
                className="lg:w-[45%] lg:h-[50px] lg:bg-[#200009] lg:border lg:rounded-xl"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input
                placeholder="Room ID..."
                type="text"
                className="lg:w-[40%] lg:h-[50px] lg:bg-[#200009] lg:border lg:rounded-xl"
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
              <button className="lg:w-[15%] lg:h-[50px] " onClick={joinRoom}>
                Join a room
              </button>
            </div>
            {/* ช่องพิมพ์ข้อความ */}
            <div className="lg:w-full">
              <Chat
                socket={socket}
                username={username}
                room={room}
                onNewMessage={handleNewMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatchingChat;
