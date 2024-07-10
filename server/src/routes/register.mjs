// import { Router } from "express";
// import connectionPool from "../utils/db.mjs";

// const registerRouter = Router();

// registerRouter.post("/", async (req, res) => {
//   const inputData = {
//     ...req.body,
//   };

//   try {
//     // Validate required fields
//     if (!inputData.name || !inputData.email || !inputData.password) {
//       return res.status(400).json({
//         code: "U002",
//         message: "Email or Username and Password is null ",
//       });
//     }

//     // Insert data into the database
//     await connectionPool.query(
//       `INSERT INTO user_profiles (userprofile_id,user_id,name, birthdate, location, city, username, email, password, sexident, sexprefer, racialprefer, meetprefer, image)
//        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13,$14) `,
//       [
//         inputData.userprofile_id,
//         inputData.user_id,
//         inputData.name,
//         inputData.birthdate,
//         inputData.location,
//         inputData.city,
//         inputData.username,
//         inputData.email,
//         inputData.password,
//         inputData.sexident,
//         inputData.sexprefer,
//         inputData.racialprefer,
//         inputData.meetprefer,
//         inputData.image,
//       ]
//     );

//     // Respond with success message
//     return res.status(200).json({
//       code: "U000",
//       message: "Register sucessfully",
//     });
//   } catch (error) {
//     // Log database errors
//     console.error("insert error:", error);
//     return res.status(500).json({ message: "Failed to create user profile." });
//   }
// });

// export default registerRouter;

import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { v4 as uuidv4 } from "uuid"; // นำเข้า uuid

const registerRouter = Router();

registerRouter.post("/", async (req, res) => {
  const {
    user_id,
    name,
    birthdate,
    location,
    city,
    username,
    email,
    password,
    sexident,
    sexprefer,
    racialprefer,
    meetprefer,
    image,
  } = req.body;

  const userprofile_id = uuidv4(); // สร้าง UUID สำหรับ userprofile_id

  try {
    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        code: "U002",
        message: "Email or Username and Password is null",
      });
    }

    // Insert data into the database
    await connectionPool.query(
      `INSERT INTO user_profiles (userprofile_id, user_id, name, birthdate, location, city, username, email, password, sexident, sexprefer, racialprefer, meetprefer, image) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [
        userprofile_id,
        user_id,
        name,
        birthdate,
        location,
        city,
        username,
        email,
        password,
        sexident,
        sexprefer,
        racialprefer,
        meetprefer,
        image,
      ]
    );

    // Respond with success message
    return res.status(200).json({
      code: "U000",
      message: "Register successfully",
    });
  } catch (error) {
    // Log database errors
    console.error("insert error:", error);
    return res.status(500).json({ message: "Failed to create user profile." });
  }
});

export default registerRouter;
