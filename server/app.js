import express from "express";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Merry Match!!");
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
