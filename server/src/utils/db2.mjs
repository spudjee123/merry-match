import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

function Connection() {
  const mongoURI = process.env.MONGO_URI_ATLAS;

  mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error:", err));
}

export default Connection;
