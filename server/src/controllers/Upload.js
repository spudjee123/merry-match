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

// เเนบรูปใน chat
app.post("/user/uploadimgfromchat", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  try {
    // ส่งไฟล์ไปยัง Cloudinary โดยใช้ upload_stream
    const uploadStream = cloudinary.uploader.upload_stream(
      { upload_preset: 'ml_default' },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            message: "Error uploading image to Cloudinary: " + error.message,
          });
        }

        const imgUrl = result.secure_url; // ส่ง URL ของภาพที่อัพโหลดไปยัง Cloudinary

        const imgFromChat = {
          img: imgUrl,
          created_at: new Date(),
          updated_at: new Date(),
        };

        try {
          await connectionPool.query(
            `INSERT INTO user_img_chat (img, created_at, updated_at) VALUES ($1, $2, $3)`,
            [imgFromChat.img, imgFromChat.created_at, imgFromChat.updated_at]
          );
          return res.status(201).json({
            message: "Create data successfully.",
            data: imgFromChat, // ส่งกลับข้อมูลที่สร้างใหม่
          });
        } catch (error) {
          console.error("Database insertion error:", error);
          return res.status(500).json({
            message: "The server has encountered a situation it does not know how to handle.",
            error: error.message,
          });
        }
      }
    );
    // ใช้ pipe เพื่อส่งไฟล์ไปยัง Cloudinary
    uploadStream.end(req.file.buffer); // ส่ง buffer ของไฟล์ไปยัง Cloudinary
  } catch (error) {
    console.error("Error processing file upload:", error);
    return res.status(500).json({
      message: "The server has encountered a situation it does not know how to handle.",
      error: error.message,
    });
  }
});


export default app;