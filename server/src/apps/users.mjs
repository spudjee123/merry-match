import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { transformKeysToCamelCase } from "../utils/utils-functions.mjs";

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

    const user = transformKeysToCamelCase({
      ...userInfo,
      hobbiesList: hobbiesList,
    });

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

usersRouter.put("/edit/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const newUser = {
    username: req.body.username,
    updatedAt: new Date(),
  };
  const newProfile = {
    name: req.body.name,
    birthdate: req.body.birthdate,
    location: req.body.location,
    city: req.body.city,
    sexident: req.body.sexident,
    sexprefer: req.body.sexprefer,
    racialprefer: req.body.racialprefer,
    meetprefer: req.body.meetprefer,
    aboutMe: req.body.aboutMe,
  };

  const hobbiesList = req.body.hobbiesList;

  try {
    const duplicatedUserData = await connectionPool.query(
      `select * from users where username = $1 and user_id != $2`,
      [newUser.username, user_id]
    );

    if (duplicatedUserData.rowCount) {
      return res.status(400).json({
        code: "U003",
        message: "Username is already used",
      });
    }

    await connectionPool.query(
      `update users set username = $1, updated_at = $2 where user_id = $3`,
      [newUser.username, newUser.updatedAt, user_id]
    );

    const insertProfileID = await connectionPool.query(
      `update user_profiles set name = $1, birthdate = $2, location = $3, city = $4, sexident = $5, sexprefer = $6, racialprefer = $7, meetprefer = $8, about_me = $9 where user_id = $10 returning profile_id`,
      [
        newProfile.name,
        newProfile.birthdate,
        newProfile.location,
        newProfile.city,
        newProfile.sexident,
        newProfile.sexprefer,
        newProfile.racialprefer,
        newProfile.meetprefer,
        newProfile.aboutMe,
        user_id,
      ]
    );

    const [{ profile_id }] = insertProfileID.rows;

    hobbiesList.forEach(async (item, index) => {
      await connectionPool.query(
        `insert into user_hobbies (profile_id, hobby_name, hobby_order) values ($1,$2,$3) `,
        [profile_id, item, index + 1]
      );
    });

    return res.status(200).json({
      code: "U000",
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server could not register because database connection",
    });
  }
});

export default usersRouter;
