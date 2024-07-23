import express from "express";
import connectionPool from "./src/utils/db.mjs";
import registerRouter from "../server/src/routes/register.mjs";
import profileRouter from "../server/src/routes/profile.mjs";
import loginRouter from "../server/src/routes/login.mjs";
import supabase from "./lib/supabase.js";
import cors from "cors";
import uploadImg from "./src/controllers/Upload.js";
import authRouter from "./src/routes/auth.mjs";
import dotenv from "dotenv";
// import { cloudinaryUpload } from "./src/controllers/Upload.js";

dotenv.config();


import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
// keyนี้สำหรับtest
const stripe = new Stripe('sk_test_51PfGepCsaxbmSm5DJmnpDuh8XVSMZVQ0jiSfh7jI0cc4hBdAr6lhXYw97a3VU48TMQz6ElBUcUxqOEUuWTINVTxQ00Qb1hJloP');const endpointSecret = "whsec_455009c349ca77c55f93710bc9f3fec27e6d5242361f7c8ae317517e597db8f9"; 

const app = express();
const port = 4001;

app.use(cors());
app.use(express.json());
app.use("/register", registerRouter);
app.use("/profile", profileRouter);
app.use("/login", loginRouter);
app.use("/auth", authRouter);

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

//admin can read
// app.get("/admin/get", async (req, res) => {
// let result;
// try {
//   result = await connectionPool.query(`select*from packages`);
//   return res.status(200).json({ data: result.rows });
// } catch {
//   return res.status(500).json({
//     message:
//       "The server has encountered a situation it does not know how to handle.",
//   });
// }

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

//admin can read by id
// app.get("/admin/get/:package_id", async (req, res) => {
//   const packagesId = req.params.package_id;
//   try {
//     const getPackageId = await connectionPool.query(
//       `select * from packages where package_id=$1`,
//       [packagesId]
//     );
//     const packages = getPackageId.rows[0];
//     if (!packages) {
//       return res.status(404).json({
//         message: `Server could not find a package id: ${packagesId}`,
//       });
//     }
//     return res.status(200).json({
//       message: "Ok Successfully",
//       data: packages,
//     });
//   } catch {
//     return res.status(500).json({
//       message:
//         "The server has encountered a situation it does not know how to handle.",
//     });
//   }
// });

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

//admin can update
// app.put("/admin/edit/:package_id", async (req, res) => {
//   const packagesId = req.params.package_id;
//   const { packages_name, merry_limit, icons, detail } = req.body;
//   const updatePackages = {
//     ...req.body,
//     updated_at: new Date(),
//   };

//   if (!packages_name || !merry_limit || !icons) {
//     return res.status(400).json({
//       message: "Missing or invalid request data.",
//     });
//   }

//   try {
//     const resultPackages = await connectionPool.query(
//       `select*from packages where package_id=$1`,
//       [packagesId]
//     );

//     if (resultPackages.rows.length === 0) {
//       return res.status(404).json({
//         message: `The server cannot find the requested resource. In the browser, this means the ${packagesId} is not recognized.`,
//       });
//     }

//     await connectionPool.query(
//       `update packages set packages_name =$2,
//       merry_limit=$3,
//       icons=$4,
//       detail=$5,
//       updated_at=$6
//       where package_id=$1
//       `,
//       [
//         packagesId,
//         updatePackages.packages_name,
//         updatePackages.merry_limit,
//         updatePackages.icons,
//         updatePackages.detail || null,
//         updatePackages.updated_at,
//       ]
//     );

//     return res.status(200).json({
//       message: "Successfully updated the data in merry match.",
//     });
//   } catch (error) {
//     console.error("Database insertion error:", error);
//     return res.status(500).json({
//       message:
//         "The server has encountered a situation it does not know how to handle.",
//       error: error.message,
//     });
//   }
// });
app.put("/admin/edit/:package_id", async (req, res) => {
  const packageId = req.params.package_id;
  const { packages_name, merry_limit, icons, detail } = req.body;

  if (!packageId || !packages_name || !merry_limit || !icons) {
    return res.status(400).json({
      message: "Invalid input, all fields except 'detail' are required",
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

//admin can delete
// app.delete("/admin/delete/:package_id", async (req, res) => {
//   const packagesId = req.params.package_id;
//   try {
//     await connectionPool.query(`delete from packages where package_id=$1`, [
//       packagesId,
//     ]);

//     return res.status(200).json({
//       message: `Successfully delete the package id: ${packagesId}`,
//     });
//   } catch (error) {
//     console.error("Database deletion error:", error);
//     return res.status(500).json({
//       message:
//         "The server has encountered a situation it does not know how to handle.",
//       error: error.message,
//     });
//   }
// });

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


app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

