import mongoose from "mongoose";

function Connection() {
  const mongoURI = "mongodb://127.0.0.1:27017/chatmerrymatch";
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error:", err));
}

export default Connection;
