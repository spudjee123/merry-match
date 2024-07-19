import { application, Router } from "express";
import connectionPool from "../utils/db.mjs";
import bcrypt from "bcrypt"

import supabase from "../apps/lib/supabase.js";
import express from 'express'

const app = express()
const registerRouter = Router();

app.use(express.json());

registerRouter.post("/", async (req, res) => {
  const inputData = { ...req.body };

  try {
    const hashPassword = await bcrypt.hash(inputData.password,10)
    // if (!inputData.name || !inputData.email || !inputData.password) {
    //   return res.status(400).json({
    //     code: "U002",
    //     message: "Name, Email, or Password is missing.",
    //   });
    let result = await connectionPool.query(
      `INSERT INTO users (username,email,password) VALUES ($1, $2, $3) RETURNING user_id`,
      [inputData.username, inputData.email, hashPassword]
    );
    const userId = result.rows[0].user_id;

    await connectionPool.query(
      `INSERT INTO user_profiles (user_id,name, birthdate, location, city, username, email, password, sexident, sexprefer, racialprefer, meetprefer, image) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12,$13)  `,
      [  userId,
        inputData.name,
        inputData.birthdate,
        inputData.location,
        inputData.city,
        inputData.username,
        inputData.email,
        hashPassword,
        inputData.sexident,
        inputData.sexprefer,
        inputData.racialprefer,
        inputData.meetprefer,
        inputData.image,
      ]
    );
 
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Failed to create user profile." });
  }
  return res.status(200).json({
    code: "U000",
    message: "Registered successfully",
  });
});

export default registerRouter;