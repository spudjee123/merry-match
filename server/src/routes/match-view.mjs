import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { transformKeysToCamelCase } from "../utils/utils-functions.mjs";

const matchViewRouter = Router();

matchViewRouter.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const merryListData = await connectionPool.query(
      `SELECT m.id , m.user_id, m.friend_id, m.status, p.*, m.user_id, i.image_url as image
        FROM match_friend m 
        INNER JOIN users u 
            ON (u.user_id = m.friend_id or u.user_id = m.user_id)
        INNER JOIN user_profiles p
            ON (p.user_id = m.friend_id or p.user_id = m.user_id)
        INNER JOIN user_images i
            ON (p.profile_id = i.profile_id)
        WHERE (m.user_id =$1 or m.friend_id = $1) and (p.user_id !=$1) 
            and not (m.friend_id = $1 and m.status = 'waiting' ) and (i.image_order = 1)
        GROUP BY m.id, p.profile_id, i.image_id
        ORDER BY m.id desc`,
      [user_id]
    );
    const merryList = merryListData.rows;

    const followerCountData = await connectionPool.query(
      `SELECT COUNT(*) as "followerCount"
        FROM match_friend
        WHERE  (user_id = $1 and status = 'match') or friend_id = $1`,
      [user_id]
    );

    const followerCount = followerCountData.rows[0];

    const matchCountData = await connectionPool.query(
      `SELECT COUNT(*) as "matchCount"
        FROM match_friend
        WHERE  (user_id = $1 or friend_id = $1) and status = 'match'`,
      [user_id]
    );

    const matchCount = matchCountData.rows[0];

    return res.json({
      code: "U000",
      message: "Get merry list successfully",
      data: merryList,
      count: {
        ...followerCount,
        ...matchCount,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server could not register because database connection",
    });
  }
});

matchViewRouter.delete("/", async (req, res) => {
  const user_id = req.body.user_id;
  const friend_id = req.body.friend_id;
  try {
    await connectionPool(
      `DELETE FROM match_friend WHERE (user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1) `,
      [user_id, friend_id]
    );
  } catch (error) {
    console.log(error);
  }
});

export default matchViewRouter;
