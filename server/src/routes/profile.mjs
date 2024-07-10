// import { Router } from "express";
// import connectionPool from "../utils/db.mjs";

// const profileRouter = Router();

// profileRouter.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await connectionPool.query(
//       `SELECT * FROM user_profiles WHERE user_id = $1`,
//       [id]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({
//         code: "U001",
//         message: "User not found",
//       });
//     }
//     const user = result.rows[0];
//     return res.status(200).json({
//       code: "U000",
//       name: user.name,
//       birthdate: user.birthdate,
//       location: user.location,
//       city: user.city,
//       username: user.username,
//       email: user.email,
//       password: user.password,
//       sexIdent: user.sex_ident,
//       sexPrefer: user.sex_prefer,
//       racialPrefer: user.racial_prefer,
//       meetPrefer: user.meet_prefer,
//       image: user.image,
//     });
//   } catch (error) {
//     console.error("Database query error:", error);
//     return res.status(500).json({
//       code: "U002",
//       message: "Server error",
//       error: error.message,
//     });
//   }
// });

// profileRouter.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const {
//     name,
//     birthdate,
//     location,
//     city,
//     username,
//     email,
//     password,
//     sexIdent,
//     sexPrefer,
//     racialPrefer,
//     meetPrefer,
//     image,
//   } = req.body;

//   if (
//     !name ||
//     !birthdate ||
//     !location ||
//     !city ||
//     !username ||
//     !email ||
//     !password ||
//     !sexIdent ||
//     !sexPrefer ||
//     !racialPrefer ||
//     !meetPrefer ||
//     !image
//   ) {
//     return res.status(400).json({
//       code: "U002",
//       message: "Please fill the required fields",
//     });
//   }

//   try {
//     const result = await connectionPool.query(
//       `UPDATE user_profiles SET name = $1, birthdate = $2, location = $3, city = $4, username = $5, email = $6, password = $7, sex_ident = $8, sex_prefer = $9, racial_prefer = $10, meet_prefer = $11, image = $12 WHERE user_id = $13`,
//       [
//         name,
//         birthdate,
//         location,
//         city,
//         username,
//         email,
//         password,
//         sexIdent,
//         sexPrefer,
//         racialPrefer,
//         meetPrefer,
//         image,
//         id,
//       ]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({
//         code: "U001",
//         message: "User not found",
//       });
//     }

//     return res.status(201).json({
//       code: "U000",
//       message: "Update successfully",
//     });
//   } catch (error) {
//     console.error("Database query error:", error);
//     return res.status(500).json({
//       code: "U002",
//       message: "Server error",
//       error: error.message,
//     });
//   }
// });

// export default profileRouter;

import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const profileRouter = Router();

profileRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await connectionPool.query(
      `SELECT * FROM user_profiles WHERE user_id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        code: "U001",
        message: "User not found",
      });
    }
    const user = result.rows[0];
    return res.status(200).json({
      code: "U000",
      name: user.name,
      birthdate: user.birthdate,
      location: user.location,
      city: user.city,
      username: user.username,
      email: user.email,
      password: user.password,
      sexIdent: user.sex_ident,
      sexPrefer: user.sex_prefer,
      racialPrefer: user.racial_prefer,
      meetPrefer: user.meet_prefer,
      image: user.image,
    });
  } catch (error) {
    console.error("Database query error:", error);
    return res.status(500).json({
      code: "U002",
      message: "Server error",
      error: error.message,
    });
  }
});

profileRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const fields = req.body;

  if (Object.keys(fields).length === 0) {
    return res.status(400).json({
      code: "U002",
      message: "Please provide at least one field to update",
    });
  }

  const validFields = [
    "name",
    "birthdate",
    "location",
    "city",
    "username",
    "email",
    "password",
    "sexIdent",
    "sexPrefer",
    "racialPrefer",
    "meetPrefer",
    "image",
  ];

  const setQuery = [];
  const values = [];

  let i = 1;
  for (const key in fields) {
    if (validFields.includes(key)) {
      setQuery.push(`${key} = $${i}`);
      values.push(fields[key]);
      i++;
    } else {
      return res.status(400).json({
        code: "U003",
        message: `Invalid field: ${key}`,
      });
    }
  }

  if (setQuery.length === 0) {
    return res.status(400).json({
      code: "U002",
      message: "Please provide at least one valid field to update",
    });
  }

  values.push(id); // add the id to the values array

  try {
    const result = await connectionPool.query(
      `UPDATE user_profiles SET ${setQuery.join(", ")} WHERE user_id = $${i}`,
      values
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        code: "U001",
        message: "User not found",
      });
    }

    return res.status(200).json({
      code: "U000",
      message: "Update successfully",
    });
  } catch (error) {
    console.error("Database query error:", error);
    return res.status(500).json({
      code: "U002",
      message: "Server error",
      error: error.message,
    });
  }
});

export default profileRouter;
