import React, { useEffect, useState } from "react";
import SendChat from "../assets/icons/sendchat.png";
import ChatImg from "../assets/icons/chatimg.png";
import axios from "axios";

const Chat = ({ socket, username, room, onNewMessage, messages }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  useEffect(() => {
    socket.emit("join_room", room);

    socket.on("message", (msg) => {
      // console.log("Received message:", msg);
      onNewMessage(msg); // เรียกใช้ callback เพื่ออัปเดตข้อความ
    });

    return () => {
      socket.off("message");
    };
  }, [socket, room, onNewMessage]);

  const sendMessage = async () => {
    let imgUrl = null;

    if (currentMessage !== "" || img.file) {
      try {
        if (img.file) {
          const uploadResponse = await upload(img.file);
          imgUrl = uploadResponse.data.img; // ตรวจสอบว่าคุณได้ URL ของภาพ
        }

        const messageData = {
          room: room,
          username: username,
          message: currentMessage,
          timestamp: new Date().toISOString(),
          img: imgUrl ? [imgUrl] : [], // ส่ง img เป็น array ของ URL
        };

        await socket.emit("newMessage", messageData);
        onNewMessage(messageData);
        setCurrentMessage("");
        setImg({ file: null, url: "" });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        // เก็บไฟล์ภาพ
        file: e.target.files[0],
        // สร้าง URL สำหรับแสดงภาพ
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const upload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "http://localhost:4001/user/uploadimgfromchat",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  return (
    <div className="lg:w-full lg:mb-[10px]">
      {/* แสดงข้อความเก่าที่ถูกส่งเข้ามา */}
      {/* <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.username === username ? "self-end" : "self-start"}`}>
            <strong>{message.username}:</strong> {message.message} 
            {message.img && <img src={message.img} alt="Uploaded" className="mt-2 rounded-lg" />}
            <span className="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div> */}

      {/* chat input */}
      <div className="lg:flex lg:mt-[20px]">
        <input
          placeholder="Message here..."
          type="text"
          className="lg:w-[85%] lg:h-[50px] lg:bg-[#200009] lg:border lg:rounded-xl"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={sendMessage}>
          <img src={SendChat} alt="" className="lg:h-[50px] lg:w-[50px]" />
        </button>
        <label
          htmlFor="file"
          className="cursor-pointer lg:flex lg:justify-center lg:items-center"
        >
          <img src={ChatImg} alt="" className="lg:h-[35px] lg:w-[35px]" />
        </label>
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleImg}
        />
      </div>
      {img.url && (
        <div className="lg:mt-[10px]">
          <img
            src={img.url}
            alt="Preview"
            className="lg:max-w-[200px] lg:max-h-[200px]"
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
