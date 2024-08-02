import { application, Router } from "express";
import connectionPool from "../utils/db.mjs";
import express from "express";

const app = express();
const merryRouter = Router();

merryRouter.post('/', async (req, res) => {
    const inputUser = { ...req.body }
    console.log(inputUser)
    try {
      const result = await connectionPool.query(
        `INSERT INTO match_friend (user_id, friend_id, updated_at) VALUES ($1, $2,$3)RETURNING *`,
        [inputUser.user_id, inputUser.friend_id, new Date()]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // update status table match_friend
  merryRouter.post('/match', async (req, res) => {
    const { user_id, friend_id } = req.body;
  
    if (!user_id || !friend_id) {
      return res.status(400).json({
        message: "Missing or invalid request data.",
      });
    }
  
    try {
      // ตรวจสอบว่ามีคู่ friend_id และ user_id ที่สลับกันอยู่ในฐานข้อมูลหรือไม่
      const checkResult = await connectionPool.query(
        'SELECT * FROM match_friend WHERE user_id = $1 AND friend_id = $2',
        [friend_id, user_id]
      );
  
      if (checkResult.rows.length > 0) {
        // อัพเดทสถานะเมื่อพบคู่ที่สลับกัน
        await connectionPool.query(
          'UPDATE match_friend SET status = $1, updated_at = $2 WHERE user_id = $3 AND friend_id = $4',
          ['match', new Date(), friend_id, user_id]
        );
        return res.status(200).json({ message: "Updated status to 'match'." });
      } else {
        // เพิ่มข้อมูลใหม่ในกรณีที่ไม่พบคู่ที่สลับกัน
        const result = await connectionPool.query(
          'INSERT INTO match_friend (user_id, friend_id) VALUES ($1, $2) RETURNING *',
          [user_id, friend_id]
        );
        return res.status(201).json(result.rows[0]);
      }
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: error.message });
    }
  });
  
  // จบทุกสิ่งทุกอย่าง เหมือนไม่มีอะไรเกิดขึ้น
  merryRouter.post('/unmatch', async (req, res) => {
    const { user_id, friend_id } = req.body;
  
    if (!user_id || !friend_id) {
      return res.status(400).json({
        message: "Missing or invalid request data.",
      });
    }
  
    try {
      const result = await connectionPool.query(
        'DELETE FROM match_friend WHERE (user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1) RETURNING *',
        [user_id, friend_id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Friendship not found' });
      }
  
      res.status(200).json({ message: 'Successfully unfriended', data: result.rows[0] });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  export default merryRouter