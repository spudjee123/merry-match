import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectionPool from "../utils/db.mjs";
import multer from "multer";
import cloudinaryProfileUplaod from "../utils/upload-profile.mjs";

const authRouter = Router();

const multerUpload = multer({ dest: "uploads-profile/" });
const imageUpload = multerUpload.fields([{ name: "image", maxCount: 5 }]);

authRouter.post("/register", imageUpload, async (req, res) => {
  console.log(req.body);
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const userProfile = {
    name: req.body.name,
    birthdate: req.body.birthdate,
    location: req.body.location,
    city: req.body.city,
    sexident: req.body.sexident,
    sexprefer: req.body.sexprefer,
    racialprefer: req.body.racialprefer,
    meetprefer: req.body.meetprefer,
  };

  const hobbiesList = req.body.hobbiesList.split(",");

  try {
    if ((!user.username && !user.email) || !user.password) {
      return res.status(400).json({
        code: "U002",
        message: "Email or username and password is null",
      });
    }

    const duplicatedUserData = await connectionPool.query(
      `select * from users where username = $1 or email =$2`,
      [user.username, user.email]
    );

    if (duplicatedUserData.rowCount) {
      return res.status(400).json({
        code: "U003",
        message: "Email or username is already used",
      });
    }

    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);

    const insertID = await connectionPool.query(
      `insert into users (username, email, password) values ($1,$2,$3) returning user_id`,
      [user.username, user.email, user.password]
    );

    const [{ user_id }] = insertID.rows;

    const insertProfileID = await connectionPool.query(
      "insert into user_profiles (user_id, name, birthdate, location, city, sexident, sexprefer, racialprefer, meetprefer) values ($1,$2,$3,$4,$5,$6,$7,$8, $9) returning profile_id",
      [
        user_id,
        userProfile.name,
        userProfile.birthdate,
        userProfile.location,
        userProfile.city,
        userProfile.sexident,
        userProfile.sexprefer,
        userProfile.racialprefer,
        userProfile.meetprefer,
      ]
    );

    const [{ profile_id }] = insertProfileID.rows;

    hobbiesList.forEach(async (item) => {
      await connectionPool.query(
        `insert into user_hobbies (profile_id, hobby_name) values ($1,$2) `,
        [profile_id, item]
      );
    });

    const images = await cloudinaryProfileUplaod(req.files);

    console.log(images);

    images.forEach(async (image, index) => {
      await connectionPool.query(
        "insert into user_images (profile_id, image_order, image_url, public_id) values ($1,$2,$3,$4)",
        [profile_id, index + 1, image.url, image.publicId]
      );
    });

    await connectionPool.query(
      `insert into user_statuses (user_id, merry_counts) values ($1,$2)`,
      [user_id, 20]
    );

    return res.json({
      code: "U000",
      message: "Register successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server could not register because database connection",
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        code: "U002",
        message: "Email or username and password is null",
      });
    }
    const userData = await connectionPool.query(
      "select * from users where username=$1 or email =$1",
      [req.body.username]
    );

    if (!userData.rowCount) {
      return res.status(404).json({
        code: "U001",
        message: "Email or Username and Password is incorrect",
      });
    }

    const user = userData.rows[0];
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(404).json({
        code: "U001",
        message: "Email or Username and Password is incorrect",
      });
    }

    const nameData = await connectionPool.query(
      "select name from user_profiles where user_id = $1",
      [user.user_id]
    );
    const [{ name }] = nameData.rows;
    user.name = name;
    const packageData = await connectionPool.query(
      `select p.packages_name, p.merry_limit from user_statuses s inner join packages p on s.package_id = p.package_id  where s.user_id = $1`,
      [user.user_id]
    );

    if (packageData.rowCount) {
      const [{ packages_name, merry_limit }] = packageData.rows;
      user.packageName = packages_name;
      user.merryLimit = merry_limit;
    } else {
      user.merryLimit = 50;
    }

    const currentDate = new Date();
    const lastLogin = user.last_login;

    if (currentDate.toDateString() !== lastLogin.toDateString()) {
      connectionPool.query(
        `update user_statuses set merry_counts = $1 where user_id = $2`,
        [user.merryLimit, user.user_id]
      );
    }

    await connectionPool.query(
      `update users set "last_login" = $1 where user_id = $2`,
      [currentDate, user.user_id]
    );

    user.lastLogin = currentDate;

    delete user.last_login;
    delete user.merryLimit;
    //not export user password (hash)
    delete user.password;

    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: 900000 });
    return res.status(201).json({
      code: "U000",
      message: "Login successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server could not login becasue database connection",
    });
  }
});

export default authRouter;
