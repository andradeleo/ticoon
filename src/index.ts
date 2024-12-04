import express from "express";

const app = express();

app.get("/example", (_, res) => {
  res.status(200).json({ message: "success" });
});

app.listen(3001, () => {
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log("🚀 App running in http://localhost:3001");
});
