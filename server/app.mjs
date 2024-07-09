import express from "express";
<<<<<<< HEAD
import connectionPool from "./src/utils/db.mjs";
import registerRouter from '../server/src/routes/register.mjs'

const app = express();
const port = 4001;

app.use(express.json());
app.use("/register", registerRouter);

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
=======

const app = express();
const port = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Merry Match!!");
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
>>>>>>> 18a4103 (feat create ui login,footer,matching page)
});
