import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const profilesRouter = Router();

profilesRouter.get("/", async (req, res) => {
  try {
    const profilesListData = await connectionPool.query(
      `select u.user_id, p.profile_id, s.status_id, p.name, p.birthdate, p.location, p.city, p.sexident, p.sexprefer, p.racialprefer,p.meetprefer, p.about_me from users u inner join user_profiles p on u.user_id = p.user_id inner join user_statuses s on u.user_id = s.user_id`
    );

    const profilesList = profilesListData.rows;

    console.log(profilesList);

    return res.status(200).json({
      message: "get",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server could not register because database connection",
    });
  }
});

export default profilesRouter;
