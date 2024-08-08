import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { transformKeysToCamelCase } from "../utils/utils-functions.mjs";
import multer from "multer";
import cloudinaryProfileUplaod from "../utils/upload-profile.mjs";

const usersRouter = Router();

const multerUpload = multer({ dest: "uploads-profile/" });
const imageUpload = multerUpload.fields([{ name: "image", maxCount: 5 }]);

usersRouter.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    // get data from users, user_profiles and user_statuses tables
    const userData = await connectionPool.query(
      "select u.email, u.username, p.* from users u inner join user_profiles p on u.user_id = p.user_id where u.user_id = $1",
      [user_id]
    );

    const userInfo = userData.rows[0];

    const hobbiesListData = await connectionPool.query(
      `select hobby_name from user_hobbies where profile_id = $1`,
      [userInfo.profile_id]
    );

    const hobbiesList = hobbiesListData.rows.map((item) => item.hobby_name);

    const imagesData = await connectionPool.query(
      `select image_url, public_id from user_images where profile_id = $1 order by image_order asc`,
      [userInfo.profile_id]
    );

    const images = imagesData.rows.map((item) => {
      const url = item.image_url;
      const public_id = item.public_id;
      return { url: url, publicId: public_id };
    });

    const user = transformKeysToCamelCase({
      ...userInfo,
      hobbiesList: hobbiesList,
      images: images,
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

usersRouter.put("/:user_id", imageUpload, async (req, res) => {
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

  const hobbiesList = req.body.hobbiesList.split(",");

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

    console.log(newUser.username);

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

    await connectionPool.query(
      "delete from user_hobbies where profile_id = $1",
      [profile_id]
    );

    hobbiesList.forEach(async (item) => {
      await connectionPool.query(
        `insert into user_hobbies (profile_id, hobby_name) values ($1,$2) `,
        [profile_id, item]
      );
    });

    // console.log(req.body.oldImage);

    // console.log(JSON.parse(req.body.oldImage[0]));

    console.log("req.body.oldImage", req.body.oldImage);

    const oldImagesData =
      typeof req.body.oldImage === "string"
        ? [req.body.oldImage]
        : typeof req.body.oldImage === "object"
        ? req.body.oldImage
        : [];

    const oldImages = oldImagesData.map((image) => {
      const imageJson = JSON.parse(image);
      return { url: imageJson.url, publicId: imageJson.publicId };
    });

    const newImages = await cloudinaryProfileUplaod(req.files);

    console.log("old image", oldImages);

    const images = [...oldImages, ...newImages];

    await connectionPool.query(
      "delete from user_images where profile_id = $1",
      [profile_id]
    );

    console.log("images are", images);

    images.forEach(async (image, index) => {
      await connectionPool.query(
        "insert into user_images (profile_id, image_order, image_url, public_id) values ($1,$2,$3,$4)",
        [profile_id, index + 1, image.url, image.publicId]
      );
    });

    return res.status(200).json({
      code: "U000",
      message: "User and profile updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server could not register because database connection",
    });
  }
});

usersRouter.delete("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    await connectionPool.query("delete from users where user_id = $1", [
      user_id,
    ]);

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
