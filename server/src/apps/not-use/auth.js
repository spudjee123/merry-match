import { db } from "../utils/db.js";
import bcrypt from "bcrypt";
import connectionPool from "../utils/db.mjs";

app.post("/register", async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      birthdate: req.body.birthdate,
      location: req.body.location,
      city: req.body.city,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      sexident: req.body.sexident,
      image: req.body.image,
      sexprefer: req.body.sexprefer,
      racialprefer: req.body.racialprefer,
      meetprefer: req.body.meetprefer,
    };

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const currentDate = new Date();
    user.created_at = currentDate;
    user.updated_at = currentDate;

    await connectionPool.query(
      `insert to user_profiles (name, birthdate, location, city, username, email, password, sexident, image, sexprefer, racialprefer, meetprefer, created_at, updated_at)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [
        user.name,
        user.birthdate,
        user.location,
        user.city,
        user.username,
        user.email,
        user.password,
        user.sexident,
        user.image,
        user.sexprefer,
        user.racialprefer,
        user.meetprefer,
        user.created_at,
        user.updated_at,
      ]
    );

    if (result.rowCount === 1) {
      return res.status(201).json({
        message: "User has been registered successfully",
      });
    } else {
      throw new Error("Failed to register user");
    }
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Failed to register user",
      error: error.message,
    });
  }
});
