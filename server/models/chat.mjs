import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  room: String,
  username: String,
  message: String,
  avatar: String,
  img: { type: [String], default: [] },
  timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model("message", chatSchema);

export default Chat;

