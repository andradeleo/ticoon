import express from "express";
import { makeSignInController } from "../factories/auth/controller/makeSignInController";
import { makeSignUpController } from "../factories/auth/controller/makeSignUpController";
import { routeAdapter } from "./adapters/routeAdapter";

const app = express();

app.use(express.json());

app.post("/sign-up", routeAdapter(makeSignUpController()));
app.post("/sign-in", routeAdapter(makeSignInController()));

app.listen(3001, () => {
	console.log("🚀 Server started at http://localhost:3001");
});
