import express from "express";
import connectionPool from "./src/utils/db.mjs";
import registerRouter from "../server/src/routes/register.mjs";
import profileRouter from "../server/src/routes/profile.mjs";

const app = express();
const port = 4001;

app.use(express.json());
app.use("/register", registerRouter);
app.use("/profile", profileRouter);

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

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
