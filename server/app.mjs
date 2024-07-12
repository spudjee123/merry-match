import express from "express";
import connectionPool from "./src/utils/db.mjs";
import registerRouter from "../server/src/routes/register.mjs";
import profileRouter from "../server/src/routes/profile.mjs";
import loginRouter from '../server/src/routes/login.mjs'
import supabase from "./lib/supabase.js";

const app = express();
const port = 4001;

app.use(express.json());
app.use("/register", registerRouter);
app.use("/profile", profileRouter);
app.use("/login", loginRouter);

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});
// get all
app.get("/users", async (req, res) => {
  let result;
  try {
    result = await connectionPool.query(`select * from users`);
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read assignment because database connection",
    });
  }
  return res.status(200).json({ data: result.rows });
});

//admin can create
app.post("/admin/create", async (req, res) => {
  const { packages_name, merry_limit, icons, detail } = req.body;

  if (!packages_name || !merry_limit || !icons) {
    return res.status(400).json({
      message: "Missing or invalid request data.",
    });
  }

  const newPackages = {
    ...req.body,
    detail: detail || null,
    created_at: new Date(),
    updated_at: new Date(),
  };

  try {
    await connectionPool.query(
      `insert into packages (packages_name,merry_limit,icons,detail,created_at,updated_at) values ($1,$2,$3,$4,$5,$6)`,
      [
        newPackages.packages_name,
        newPackages.merry_limit,
        newPackages.icons,
        newPackages.detail,
        newPackages.created_at,
        newPackages.updated_at,
      ]
    );
    return res.status(201).json({
      message: "Create data successfully.",
    });
  } catch (error) {
    console.error("Database insertion error:", error);
    return res.status(500).json({
      message:
        "The server has encountered a situation it does not know how to handle.",
      error: error.message,
    });
  }
});

//admin can read
app.get("/admin/get", async (req, res) => {
  // let result;
  // try {
  //   result = await connectionPool.query(`select*from packages`);
  //   return res.status(200).json({ data: result.rows });
  // } catch {
  //   return res.status(500).json({
  //     message:
  //       "The server has encountered a situation it does not know how to handle.",
  //   });
  // }

  //ดึงข้อมูลจาก supabase เพื่อดู
  let { data: packages, error } = await supabase.from("packages").select("*");
  return res.status(200).json({ packages });
});

//admin can update
app.put("/admin/edit/:package_id", async (req, res) => {
  const packagesId = req.params.package_id;
  const { packages_name, merry_limit, icons, detail } = req.body;
  const updatePackages = {
    ...req.body,
    updated_at: new Date(),
  };

  if (!packages_name || !merry_limit || !icons) {
    return res.status(400).json({
      message: "Missing or invalid request data.",
    });
  }

  try {
    const resultPackages = await connectionPool.query(
      `select*from packages where package_id=$1`,
      [packagesId]
    );

    if (resultPackages.rows.length === 0) {
      return res.status(404).json({
        message: `The server cannot find the requested resource. In the browser, this means the ${packagesId} is not recognized.`,
      });
    }

    await connectionPool.query(
      `update packages set packages_name =$2,
      merry_limit=$3,
      icons=$4,
      detail=$5,
      updated_at=$6
      where package_id=$1
      `,
      [
        packagesId,
        updatePackages.packages_name,
        updatePackages.merry_limit,
        updatePackages.icons,
        updatePackages.detail || null,
        updatePackages.updated_at,
      ]
    );

    return res.status(200).json({
      message: "Successfully updated the data in merry match.",
    });
  } catch (error) {
    console.error("Database insertion error:", error);
    return res.status(500).json({
      message:
        "The server has encountered a situation it does not know how to handle.",
      error: error.message,
    });
  }
});

//admin can delete
app.delete("/admin/delete/:package_id", async (req, res) => {
  const packagesId = req.params.package_id;
  try {
    await connectionPool.query(`delete from packages where package_id=$1`, [
      packagesId,
    ]);

    return res.status(200).json({
      message: `Successfully delete the package id: ${packagesId}`,
    });
  } catch (error) {
    console.error("Database deletion error:", error);
    return res.status(500).json({
      message:
        "The server has encountered a situation it does not know how to handle.",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
