import express from "express";
import cloudinary from "../utils/cloudinary.js";
import upload from "../middlewares/Multer.js";

const app = express();

app.post("/uploadsAdmin", upload.single("image"), (req, res) => {
  // ตรวจสอบว่ามีไฟล์ที่อัปโหลดหรือไม่
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded.",
    });
  }

  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error uploading image to Cloudinary: " + err.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result,
    });
  });
});

export default app;
