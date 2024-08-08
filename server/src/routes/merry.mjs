import { application, Router } from "express";
import connectionPool from "../utils/db.mjs";
import express from "express";

const app = express();
const merryRouter = Router();

// update status table match_friend
merryRouter.post("/match", async (req, res) => {
  const { user_id, friend_id } = req.body;

  if (!user_id || !friend_id) {
    return res.status(400).json({
      message: "Missing or invalid request data.",
    });
  }

  try {
    // ตรวจสอบว่ามีคู่ friend_id และ user_id ที่สลับกันอยู่ในฐานข้อมูลหรือไม่
    const checkResult = await connectionPool.query(
      "SELECT * FROM match_friend WHERE user_id = $1 AND friend_id = $2",
      [friend_id, user_id]
    );

    if (checkResult.rows.length > 0) {
      // อัพเดทสถานะเมื่อพบคู่ที่สลับกัน
      await connectionPool.query(
        "UPDATE match_friend SET status = $1, updated_at = $2 WHERE user_id = $3 AND friend_id = $4",
        ["match", new Date(), friend_id, user_id]
      );
      return res.status(200).json({ message: "Updated status to 'match'." });
    } else {
      // เพิ่มข้อมูลใหม่ในกรณีที่ไม่พบคู่ที่สลับกัน
      const result = await connectionPool.query(
        "INSERT INTO match_friend (user_id, friend_id) VALUES ($1, $2) RETURNING *",
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
merryRouter.post("/unmatch", async (req, res) => {
  const { user_id, friend_id } = req.body;

  if (!user_id || !friend_id) {
    return res.status(400).json({
      message: "Missing or invalid request data.",
    });
  }

  try {
    const result = await connectionPool.query(
      "DELETE FROM match_friend WHERE (user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1) RETURNING *",
      [user_id, friend_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Friendship not found" });
    }

    res
      .status(200)
      .json({ message: "Successfully unfriended", data: result.rows[0] });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: error.message });
  }
});

merryRouter.get("/status/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    let result = await connectionPool.query(
      `
      SELECT m.id, m.user_id, m.friend_id, m.status, p.name, m.user_id, i.image_url as image
FROM match_friend m 
INNER JOIN users u 
  ON (u.user_id = m.friend_id or u.user_id = m.user_id)
INNER JOIN user_profiles p
  ON (p.user_id = m.friend_id or p.user_id = m.user_id)
INNER JOIN user_images i
  ON (p.profile_id = i.profile_id)
WHERE (m.user_id = $1 or m.friend_id = $1) and (p.user_id !=$1) and (i.image_order = 1) and (status = 'match')
GROUP BY m.id, p.profile_id, i.image_id
ORDER BY m.id desc;
    `,
      [userId]
    );

    const userData = result.rows;
    return res.status(200).json({
      code: "U000",
      message: "Get profiles successfully",
      data: userData,
      image: userData.map((item)=> item.image),
      name: userData.map((item)=> item.name)
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server could not read data due to a database connection issue",
    });
  }
});

export default merryRouter;
