import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { transformKeysToCamelCase } from "../utils/utils-functions.mjs";

const profilesRouter = Router();

profilesRouter.get("/", async (req, res) => {
  try {
    const profilesListData = await connectionPool.query(
      `select u.user_id, p.profile_id, p.name, p.birthdate, p.location, p.city, p.sexident, p.sexprefer, p.racialprefer,p.meetprefer, i.image_url, i.image_order from users u inner join user_profiles p on u.user_id = p.user_id inner join user_images i on p.profile_id = i.profile_id where i.image_order = 1 `
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

profilesRouter.get("/available/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  const keyword = req.query.keyword;
  const minAgeRaw = req.query.min_age;
  const maxAgeRaw = req.query.max_age;
  const sex = req.query.sex;

  const minAge = minAgeRaw === "" ? null : Number(minAgeRaw) ? minAgeRaw : null;
  const maxAge = maxAgeRaw === "" ? null : Number(maxAgeRaw) ? maxAgeRaw : null;

  console.log("query", req.query);

  console.log("keyword", keyword);
  console.log("minAge", minAge);
  console.log("maxAge", maxAge);
  console.log("sex", sex);
  try {
    const profilesListData = await connectionPool.query(
      `
     SELECT p.*, i.image_url as "image", EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER - EXTRACT(YEAR FROM p.birthdate)::INTEGER as age, count(*)
    FROM user_profiles p
      INNER JOIN user_images i
        ON i.profile_id = p.profile_id
      LEFT JOIN user_hobbies h
        ON p.profile_id = h.profile_id
    WHERE p.user_id NOT IN (
        SELECT m1.friend_id
          FROM match_friend m1
          WHERE m1.user_id = $1
        ) 
      and p.user_id NOT IN (
        SELECT m2.user_id
          FROM match_friend m2
          WHERE m2.friend_id = $1 and m2.status = 'match'
        ) 
      and p.user_id != $1 and i.image_order = 1 
      and (sexident = $2 or $2 = '' or $2 isnull)
      and (((EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER - EXTRACT(YEAR FROM p.birthdate)::INTEGER) > $3) or $3 isnull )
      and (((EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER - EXTRACT(YEAR FROM p.birthdate)::INTEGER) > $4) or $4 isnull )
      and (p.name ilike $5 or p.location ilike $5 or p.city ilike $5 or p.sexident ilike $5 or  p.sexprefer ilike $5 or p.racialprefer ilike $5 or p.meetprefer ilike $5 or p.about_me ilike $5 or h.hobby_name ilike $5 or $5 = '' or $5 isnull)
    GROUP BY p.profile_id, i.image_id
        `,
      [user_id, sex, minAge, maxAge, keyword]
    );
    const profilesList = profilesListData.rows;

    return res.status(200).json({
      code: "U000",
      message: "Get available profiles successfully",
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
  const user_id = req.params.user_id;
  try {
    const profileData = await connectionPool.query(
      `select * from user_profiles where user_id = $1`,
      [user_id]
    );

    const profile = transformKeysToCamelCase(profileData.rows[0]);

    const profile_id = profile.profile_id;

    const hobbiesListData = await connectionPool.query(
      `select hobby_name from user_hobbies where profile_id = $1`,
      [profile_id]
    );

    const hobbiesList = hobbiesListData.rows.map((item) => item.hobby_name);

    const imagesData = await connectionPool.query(
      `select image_url from user_images where profile_id = $1 order by image_order asc `,
      [profile_id]
    );
    const images = imagesData.rows.map((item) => item.image_url);

    return res.status(200).json({
      code: "U000",
      message: "Get profile successfully",
      data: { ...profile, hobbiesList, images },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server could not register because database connection",
    });
  }
});

export default profilesRouter;
