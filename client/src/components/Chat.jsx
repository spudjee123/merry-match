import React, { useEffect, useState } from "react";
import SendChat from "../assets/icons/sendchat.png";
import ChatImg from "../assets/icons/chatimg.png";
import axios from "axios";

const Chat = ({ socket, username, room, onNewMessage }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  // state for upload img
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const sendMessage = async () => {
    let imgUrl = null;

    if (currentMessage !== "" || img.file) {
      try {
        if (img.file) {
          imgUrl = await upload(img.file);
        }

        const messageData = {
          room: room,
          author: username,
          message: currentMessage,
          time: new Date().toLocaleTimeString(),
          ...(imgUrl && { img: imgUrl }),
        };

        await socket.emit("send_message", messageData);
        onNewMessage(messageData); // เพิ่มข้อความที่ส่งเข้าไปในสถานะ messages
        setCurrentMessage(""); // Clear message input after sending
        setImg({ file: null, url: "" }); // Clear image input after sending
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      onNewMessage(data); // Notify parent component about new message
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket, onNewMessage]);

  // function for uploading img
  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
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
      return response.data.url; // Adjust according to your API response
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  return (
    <div className="lg:w-full lg:mb-[10px]">
      {/* chat input */}
      <div className="lg:flex lg:mt-[20px]">
        <input
          placeholder="Message here..."
          type="text"
          className="lg:w-[85%] lg:h-[50px] lg:bg-[#200009] lg:border lg:rounded-xl"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button className="" onClick={sendMessage}>
          <img src={SendChat} alt="" className="lg:h-[50px] lg:w-[50px]" />
        </button>
        <label htmlFor="file" className="cursor-pointer">
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
