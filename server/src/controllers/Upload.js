import express from "express";
import cloudinary from "../utils/cloudinary.js";
import upload from "../middlewares/Multer.js";

const app = express();

app.post("/uploadsAdmin", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded.",
    });
  }

  // file upload 3) Sending file upload request to Cloudinary
  try {
    const uploadImage = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: 'ml_default',
      public_id: 'icon',
      allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'webp']
    });

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: uploadImage,
    });
  } catch (err) {
    console.error("Error uploading image to Cloudinary:", err);
    res.status(500).json({
      success: false,
      message: "Error uploading image to Cloudinary: " + err.message,
    });
  }
});




export default app;