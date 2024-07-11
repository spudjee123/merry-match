import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import bcrypt from "bcrypt"

const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
        return res.status(400).json({
          code: "U002",
          message: "Email or Username and Password is null"
        });
      }
  
      try{
        const [result] = await connectionPool.query("SELECT * FROM user_profiles WHERE email = $1 OR username = $2", [usernameOrEmail, usernameOrEmail]);
    const user = result[0];

    if (!user) {
      return res.status(404).json({
        code: "U001",
        message: "Email or Username and Password is incorrect"
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(404).json({
        code: "U001",
        message: "Email or Username and Password is incorrect"
      });
    }

    res.status(200).json({ message: "Login successful" });
    
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({
        "message": "Server could not login because database connection"
      });
  }
    
  });
  
export default loginRouter 