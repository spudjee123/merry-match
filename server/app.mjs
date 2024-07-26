import express from "express";
import connectionPool from "./src/utils/db.mjs";
import registerRouter from "../server/src/routes/register.mjs";
import profileRouter from "../server/src/routes/profile.mjs";
import loginRouter from "../server/src/routes/login.mjs";
import stripeRouter from "../server/src/routes/payment.mjs"
import supabase from "./lib/supabase.js";
import cors from "cors";
import uploadImg from "./src/controllers/Upload.js";
import authRouter from "./src/routes/auth.mjs";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import upload from "./src/middlewares/Multer.js";
import cloudinary from "./src/utils/cloudinary.js";

dotenv.config();


import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
// keyนี้สำหรับtest
const stripe = new Stripe('sk_test_51PfGepCsaxbmSm5DJmnpDuh8XVSMZVQ0jiSfh7jI0cc4hBdAr6lhXYw97a3VU48TMQz6ElBUcUxqOEUuWTINVTxQ00Qb1hJloP');const endpointSecret = "whsec_455009c349ca77c55f93710bc9f3fec27e6d5242361f7c8ae317517e597db8f9"; 

const app = express();

app.use(cors())
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

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("Join_room", (data) => {
    socket.join(data);
    // Check id to join room
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    // check detail chat room, id, author,message,time
    // console.log("Message sent from server:", data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

const port = 4001;

app.use(express.json());
app.use("/register", registerRouter);
app.use("/profile", profileRouter);
app.use("/login", loginRouter);
app.use("/auth", authRouter);
app.use("/", stripeRouter)

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
    console.log("authorization", auth);

    result = await connectionPool.query(`select * from users`);
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
// app.post("/user/uploadimgfromchat", upload.single("file"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   const imgUrl = `http://localhost:4001/uploads/${req.file.filename}`;

//   const newPackages = {
//     img: imgUrl,
//     created_at: new Date(),
//     updated_at: new Date(),
//   };

//   try {
//     await connectionPool.query(
//       `INSERT INTO user_img_chat (img, created_at, updated_at) VALUES ($1, $2, $3)`,
//       [newPackages.img, newPackages.created_at, newPackages.updated_at]
//     );
//     return res.status(201).json({
//       message: "Create data successfully.",
//     });
//   } catch (error) {
//     console.error("Database insertion error:", error);
//     return res.status(500).json({
//       message: "The server has encountered a situation it does not know how to handle.",
//       error: error.message,
//     });
//   }
// });
app.post("/user/uploadimgfromchat", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // ส่งไฟล์ไปยัง Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: 'ml_default', // เปลี่ยนเป็น upload preset ที่คุณต้องการ
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
      data: newPackages, // ส่งกลับข้อมูลที่สร้างใหม่
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

// ยิงreq ไปที่stripeโดยตรง
app.post('/api/checkout', express.json(),async(req,res)=>{
  console.log(req.body);
  const { user, packageName } = req.body
  if (!user || !packageName) {
    return res.status(400).json({ error: "Missing user or packageName in request body" });
  }

  if (!user.name || !packageName.name) {
    return res.status(400).json({ error: "Missing name in user or packageName" });
  }
  // random id 
  const orderId = uuidv4();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'thb',
            product_data: {
              name: packageName.name,
            },
            unit_amount: packageName.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:4001/success?id=${orderId}`,
      cancel_url: `http://localhost:4001/cancel?id=${orderId}`,
    });

    const orderData = {
      name: user.name,
      package_name: packageName.name,
      order_id : orderId,
      session_id: session.id,
      status: session.status
    }

    const result = await connectionPool.query(`INSERT INTO payment_test (name,package_name,order_id,status,session_id) 
      VALUES ($1, $2, $3, $4, $5) `, [  
        user.name,
        packageName.name,
        orderId,
        session.status,
        session.id,
      ])

    console.log('Created session:', session);

    res.json({ user, packageName, order: result });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: error.message });
  }
})

// เช็ค order id ว่า status เป็นยังไง
app.get("/api/order/:id", async (req, res) => {
  const { id } = req.params
  try {
    const result = await connectionPool.query(`select * from payment_test where order_id = $1 `,[id]);
    res.json({result})
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read assignment because database connection",
    });
  }

});

app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  // รับค่า stripe-signature
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    // แล้วเอาไปเทียบ
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event ถ้าทำสำเร็จ
  switch (event.type) {
    case 'checkout_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log('paymentIntentSucceeded',paymentIntentSucceeded)
      // Then define and call a function to handle the event payment_intent.succeeded ได้Data objออกมา จะบอกว่าสำเร็จ
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});


server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

