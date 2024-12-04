import express from "express";

const app = express();

app.get("/example", (req, res) => {
  res.status(200).json({ message: "success" });
})

app.listen(3001, () => {
  console.log("🚀 App running in http://localhost:3001")
})