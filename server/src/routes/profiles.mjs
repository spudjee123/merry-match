import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { transformKeysToCamelCase } from "../utils/utils-functions.mjs";

const profilesRouter = Router();

profilesRouter.get("/", async (req, res) => {
  try {
    const profilesListData = await connectionPool.query(
      `select p.profile_id, p.name, p.birthdate, p.location, p.city, p.sexident, p.sexprefer, p.racialprefer,p.meetprefer from users u inner join user_profiles p on u.user_id = p.user_id inner join user_images i on p.user `
    );

    const profilesList = profilesListData.rows;

    console.log(profilesList);

    return res.status(200).json({
      code: "U000",
      message: "Get profiles successfully",
      data: profilesList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server could not register because database connection",
    });
  }
});

profilesRouter.get("/:user_id", async (req, res) => {
  const profile_id = req.params.profile_id;
  try {
    const profileData = await connectionPool.query(
      `select * from user_profiles where profile_id = $1`,
      [profile_id]
    );

    const hobbiesListData = await connectionPool.query(
      `select hobby_name from user_hobbies where profile_id = $1 order by  hobby_order asc`,
      [profile_id]
    );

    const hobbiesList = hobbiesListData.rows.map((item) => item.hobby_name);

    const profile = transformKeysToCamelCase({
      ...profileData.rows[0],
      hobbiesList: hobbiesList,
    });

    return res.status(200).json({
      code: "U000",
      message: "Get profile successfully",
      data: profile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server could not register because database connection",
    });
  }
});

export default profilesRouter;
