import "express-async-errors";
import router from "./routes";
import express, {} from "express";
import { errorHandler } from "../application/middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(3001, () => {
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log("🚀 App running in http://localhost:3001");
});
