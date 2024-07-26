import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const usersRouter = Router();

usersRouter.get("/view/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    // get data from users, user_profiles and user_statuses tables
    const userData = await connectionPool.query(
      `select * from users u inner join user_profiles p on u.user_id = p.user_id inner join user_statuses s on u.user_id = s.user_id where u.user_id = $1`,
      [user_id]
    );

    const userInfo = userData.rows[0];

    const hobbiesListData = await connectionPool.query(
      `select hobby_name from user_hobbies where profile_id = $1 order by hobby_order asc`,
      [userInfo.profile_id]
    );

    const hobbiesList = hobbiesListData.rows.map((item) => item.hobby_name);

    const user = {
      ...userInfo,
      hobbiesList: hobbiesList,
    };

    user.aboutMe = user.about_me;

    delete user.about_me;

    delete user.password;

    return res.status(200).json({
      code: "U000",
      message: "Get user successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server could not register because database connection",
    });
  }
});

export default usersRouter;
