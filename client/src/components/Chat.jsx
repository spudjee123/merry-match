import React, { useEffect, useState } from "react";
import SendChat from "../assets/icons/sendchat.png";
import ChatImg from "../assets/icons/chatimg.png";
import axios from "axios";

const Chat = ({ socket, username, room, onNewMessage }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  useEffect(() => {
    // Join the specified room
    socket.emit("join_room", room);

    socket.on("message", (msg) => {
      setChats((prevChats) => [...prevChats, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket, room]);

  const sendMessage = async () => {
    let imgUrl = null;

    if (currentMessage !== "" || img.file) {
      try {
        if (img.file) {
          const uploadResponse = await upload(img.file);
          imgUrl = uploadResponse.img;
        }

        const messageData = {
          room: room,
          author: username,
          message: currentMessage,
          time: new Date().toLocaleTimeString(),
          img: imgUrl,
        };

        await socket.emit("send_message", messageData);
        onNewMessage(messageData);
        // Clear message input after sending
        setCurrentMessage("");
        // Clear image input after sending
        setImg({ file: null, url: "" });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // function for uploading img
  const handleImg = (e) => {
    console.log("File selected:", e.target.files[0]);
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
      console.log("Upload response:", response.data);
      return response.data;
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
