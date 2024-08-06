import mongoose from "mongoose";

function Connection() {
  const mongoURI = "mongodb://127.0.0.1:27017";
  mongoose
    .connect(mongoURI)
    .then(() => console.log("connected"))
    .catch((err) => console.log(err));
}

export default Connection;
