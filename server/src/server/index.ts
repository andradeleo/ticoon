import express from "express";
import { makeSignInController } from "../factories/auth/controller/makeSignInController";
import { makeSignUpController } from "../factories/auth/controller/makeSignUpController";
import { routeAdapter } from "./adapters/routeAdapter";
import { middlewareAdapter } from "./adapters/middlewareAdapter";
import { makeAuthenticationMiddleware } from "../factories/auth/middleware/makeAuthenticationMiddleware";
import { makeAuthorizationMiddleware } from "../factories/auth/middleware/makeAuthorizationMiddleware";
import { CreateQuizController } from "../application/controllers/quiz/CreateQuizController";

const app = express();

app.use(express.json());

app.post("/sign-up", routeAdapter(makeSignUpController()));
app.post("/sign-in", routeAdapter(makeSignInController()));

app.post(("/quiz"), 
          middlewareAdapter(makeAuthenticationMiddleware()), 
          middlewareAdapter(makeAuthorizationMiddleware(["ADMIN", "USER"])),
          routeAdapter(new CreateQuizController())
        );

app.listen(3001, () => {
	console.log("🚀 Server started at http://localhost:3001");
});
