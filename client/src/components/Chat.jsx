import React, { useEffect, useState } from "react";

const Chat = ({ socket, username, room, onNewMessage }) => {
  const [currentMessage, setCurrentMessage] = useState("");

  //   const sendMessage = async () => {
  //     if (currentMessage !== "") {
  //       const messageData = {
  //         room: room,
  //         author: username,
  //         message: currentMessage,
  //         time:
  //           new Date(Date.now()).getHours() +
  //           ":" +
  //           new Date(Date.now()).getMinutes(),
  //       };
  //       await socket.emit("send_message", messageData);
  //       setCurrentMessage("");  // Clear message input after sending
  //     }
  //   };
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date().toLocaleTimeString(),
      };
      try {
        await socket.emit("send_message", messageData);
        setCurrentMessage(""); // Clear message input after sending
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

  return (
    <div>
      {/* chat input */}
      <div className="lg:h-[50px] lg:w-full">
        <input
          placeholder="Message here..."
          type="text"
          className="lg:w-[85%] lg:h-[50px]"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button className="lg:w-[15%] lg:h-[50px]" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
