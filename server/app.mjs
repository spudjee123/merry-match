import express from "express";
import connectionPool from "./src/utils/db.mjs";
import stripeRouter from "../server/src/routes/payment.mjs";
import supabase from "./lib/supabase.js";
import cors from "cors";
import uploadImg from "./src/controllers/Upload.js";
import authRouter from "./src/routes/auth.mjs";
import dotenv from "dotenv";
import { protect } from "./src/middlewares/protect.mjs";
import usersRouter from "./src/routes/users.mjs";
import profilesRouter from "./src/routes/profiles.mjs";
import http from "http";
import { Server } from "socket.io";
import upload from "./src/middlewares/Multer.js";
import cloudinary from "./src/utils/cloudinary.js";
import merryRouter from "./src/routes/merry.mjs";
import Connection from "./src/utils/db2.mjs";
import mongoose from "mongoose";
import Chat from "./models/chat.mjs";
import matchViewRouter from "./src/routes/match-view.mjs";

dotenv.config();

import { validate as isUuid } from "uuid";

import { timeStamp } from "console";
const app = express();

// เชื่อม mongodb for chat database
Connection();

app.use(cors());
// chat
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );

// socket.io
io.on("connection", (socket) => {
  console.log("connected");

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // chat to database
  const loadMessages = async () => {
    try {
      const message = await Chat.find().sort({ timeStamp: 1 }).exec();
      socket.emit("chat", message);
    } catch (err) {
      console.log(err);
    }
  };
  loadMessages();

  socket.on("newMessage", async (msg) => {
    try {
      const newMessage = new Chat(msg);
      await newMessage.save();
      io.emit("message", msg);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("send_message", (msg) => {
    console.log(msg);
    io.to(msg.room).emit("message", msg); // ส่งข้อความไปยังห้องที่กำหนด
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

const port = 4001;

app.use(express.json());
app.use("/auth", authRouter);

// app.use(protect);
app.use("/payments", stripeRouter);
app.use("/users", usersRouter);
app.use("/profiles", profilesRouter);
app.use("/merry", merryRouter);
app.use("/merry-list", matchViewRouter);

// app.use(protect);

//เรียกใช้ api สำหรับ ยิง postman to cloudinary
app.use("/api/admin", uploadImg);

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

// get all user
app.get("/users", async (req, res) => {
  let result;
  try {
    const auth = req.headers["authorization"];

    result = await connectionPool.query(
      `select profile_id,name,image_url from user_profiles`
    );
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read assignment because database connection",
    });
  }
  return res.status(200).json({ data: result.rows });
});

//admin can create
app.post("/admin/create", async (req, res) => {
  const { packages_name, merry_limit, icons, detail } = req.body;

  if (!packages_name || !merry_limit || !icons) {
    return res.status(400).json({
      message: "Missing or invalid request data.",
    });
  }

  const newPackages = {
    ...req.body,
    detail: detail || null,
    created_at: new Date(),
    updated_at: new Date(),
  };

  try {
    await connectionPool.query(
      `insert into packages (packages_name,merry_limit,icons,detail,created_at,updated_at) values ($1,$2,$3,$4,$5,$6)`,
      [
        newPackages.packages_name,
        newPackages.merry_limit,
        newPackages.icons,
        newPackages.detail,
        newPackages.created_at,
        newPackages.updated_at,
      ]
    );
    return res.status(201).json({
      message: "Create data successfully.",
    });
  } catch (error) {
    console.error("Database insertion error:", error);
    return res.status(500).json({
      message:
        "The server has encountered a situation it does not know how to handle.",
      error: error.message,
    });
  }
});

// user upload img from chat
app.post("/user/uploadimgfromchat", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // ส่งไฟล์ไปยัง Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: "ml_default", // เปลี่ยนเป็น upload preset ที่คุณต้องการ
    });

    // รับ URL ของภาพจาก Cloudinary
    const imgUrl = uploadResult.secure_url;

    const newPackages = {
      img: imgUrl,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // บันทึกข้อมูล URL ของภาพในฐานข้อมูล
    await connectionPool.query(
      `INSERT INTO user_img_chat (img, created_at, updated_at) VALUES ($1, $2, $3)`,
      [newPackages.img, newPackages.created_at, newPackages.updated_at]
    );

    return res.status(201).json({
      message: "Create data successfully.",
      data: {
        img: imgUrl,
        created_at: newPackages.created_at,
        updated_at: newPackages.updated_at,
      }, // ส่งกลับข้อมูลที่สร้างใหม่
    });
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return res.status(500).json({
      message: "Error uploading image to Cloudinary: " + error.message,
    });
  }
});

//ดึงข้อมูลจาก supabase เพื่อดู
app.get("/admin/get", async (req, res) => {
  try {
    let { data: packages, error } = await supabase.from("packages").select("*");
    if (error) {
      console.error("Error fetching packages:", error);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ packages });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/admin/get/:package_id", async (req, res) => {
  const packageId = req.params.package_id;

  if (!packageId) {
    return res.status(400).json({
      message: "Package ID is required",
    });
  }

  try {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("package_id", packageId)
      .single();

    if (error) {
      return res.status(404).json({
        message: `Server could not find a package with id: ${packageId}`,
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Package retrieved successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "The server has encountered a situation it does not know how to handle.",
      error: error.message,
    });
  }
});

app.put("/admin/edit/:package_id", async (req, res) => {
  const packageId = req.params.package_id;
  const { packages_name, merry_limit, icons, detail } = req.body;

  if (!packageId || !packages_name || !merry_limit || !icons) {
    return res.status(400).json({
      message: "Invalid input, all fields except detail are required",
    });
  }

  if (typeof merry_limit !== "number") {
    return res.status(400).json({
      message: "'merry_limit' must be a number",
    });
  }

  try {
    const detailString = detail ? detail : "";

    const { data, error } = await supabase
      .from("packages")
      .update({
        packages_name,
        merry_limit,
        icons,
        detail: detailString,
      })
      .eq("package_id", packageId)
      .select();

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Package not found or update failed",
      });
    }

    return res.status(200).json({
      message: "Package updated successfully",
      packages: data[0],
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "The server has encountered a situation it does not know how to handle.",
      error: error.message,
    });
  }
});

app.delete("/admin/delete/:package_id", async (req, res) => {
  const packageId = req.params.package_id;

  try {
    const { error } = await supabase
      .from("packages")
      .delete()
      .eq("package_id", packageId);

    if (error) {
      console.error("Supabase deletion error:", error);
      return res.status(500).json({
        message:
          "The server has encountered a situation it does not know how to handle.",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: `Successfully deleted the package id: ${packageId}`,
    });
  } catch (error) {
    console.error("Supabase deletion error:", error);
    return res.status(500).json({
      message:
        "The server has encountered a situation it does not know how to handle.",
      error: error.message,
    });
  }
});

//admin upload icon
// app.post("/uploadsAdmin", upload.fields([{ name: "avatar", maxCount: 2 }]), async (req, res) => {
//   try {
//     const uploadResult = await cloudinaryUpload(req.files);

//     res.status(200).json({
//       success: true,
//       message: "Uploaded!",
//       data: uploadResult,
//     });
//   } catch (err) {
//     console.error("Error uploading image to Cloudinary:", err);
//     res.status(500).json({
//       success: false,
//       message: "Error uploading image to Cloudinary: " + err.message,
//     });
//   }
// });

//user create complaint
app.post("/user/complaint", async (req, res) => {
  const { user_id, name, issue, description, status } = req.body;

  if (!user_id || !name || !issue || !description) {
    return res.status(400).json({
      message: "Missing or invalid request data.",
    });
  }

  const newComplaint = {
    ...req.body,
    status: status || "New",
    created_at: new Date(),
    updated_at: new Date(),
  };

  try {
    await connectionPool.query(
      `insert into user_complaint (user_id,name,issue,description,status,created_at) values ($1,$2,$3,$4,$5,$6)`,
      [
        newComplaint.user_id,
        newComplaint.name,
        newComplaint.issue,
        newComplaint.description,
        newComplaint.status,
        newComplaint.created_at,
      ]
    );
    return res.status(201).json({
      message: "Create complaint successfully.",
    });
  } catch (error) {
    console.error("Database insertion error:", error);
    return res.status(500).json({
      message:
        "The server has encountered a situation it does not know how to handle.",
      error: error.message,
    });
  }
});

// เทส get package name for noon
stripeRouter.get("/api/order/:order_id", async (req, res) => {
  const orderId = req.params.order_id;

  // ตรวจสอบฟอร์แมตของ UUID
  if (!isUuid(orderId)) {
    return res.status(400).json({
      message: "Invalid order ID format. Order ID must be a valid UUID.",
    });
  }

  console.log("Order ID:", orderId); // พิมพ์ orderId เพื่อตรวจสอบ

  try {
    const { data, error } = await supabase
      .from("payment_test")
      .select("package_name")
      .eq("order_id", orderId)
      .maybeSingle();

    console.log("Data:", data); // พิมพ์ข้อมูลที่ดึงมาเพื่อตรวจสอบ

    if (error) {
      return res.status(500).json({
        message: "There was an error retrieving the data from the database.",
        error: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({
        message: `No package found with order ID: ${orderId}`,
      });
    }

    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.error("Server error:", error); // พิมพ์ข้อผิดพลาดจากเซิร์ฟเวอร์
    return res.status(500).json({
      message:
        "The server has encountered a situation it does not know how to handle.",
      error: error.message,
    });
  }
});

// admin can get complaint from supabase
app.get("/complaint/list", async (req, res) => {
  try {
    let { data: userComplaint, error } = await supabase
      .from("user_complaint")
      .select("*");
    if (error) {
      console.error("Error fetching complaint list:", error);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ userComplaint });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// create message
app.post("/msg", async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const newmessage = await MessageChannel.create({
      message: message,
      Chatusers: [from, to],
      Sender: from,
    });
    return res.status(200).json(newmessage);
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
});

// create message
app.get("/get/chat/msg/:user1Id/:user2Id", async (req, res) => {
  try {
    const from = req.params.user1Id;
    const to = req.params.user2Id;

    const newmessage = await Message.find({
      Chatusers: {
        $all: [from, to],
      },
    }).sort({ updateAt: -1 });
    const allmessage = newmessage.map((msg) => {
      return {
        myself: msg.Sender.toString() == from,
        message: msg.message,
      };
    });
    return res.status(200).json(allmessage);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
