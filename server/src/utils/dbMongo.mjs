import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

function connectToDatabase() {
  const mongoURI = process.env.MONGO_URI_ATLAS;

  mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error:", err));

  return mongoose.connection;
}

const db = connectToDatabase();

export default db;
