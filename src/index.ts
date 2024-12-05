import "express-async-errors";
import express, {} from "express";
import { errorHandler } from "./application/middlewares/errorHandler";
import AuthenticationController from "./application/controllers/AuthenticationController";

const app = express();

app.use(express.json());

app.post("/sign-up", AuthenticationController.signUp);
app.post("/sign-in", AuthenticationController.signIn);

app.use(errorHandler);

app.listen(3001, () => {
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log("🚀 App running in http://localhost:3001");
});
