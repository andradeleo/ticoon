import { Router } from "express";
import { makeAuthenticationController } from "src/factories/makeAuthenticationController";
import { makeQuizController } from "src/factories/makeQuizController";

const router = Router();

const authenticationController = makeAuthenticationController();

router.post("/sign-up", authenticationController.signUp);
router.post("/sign-in", authenticationController.signIn);

const quizController = makeQuizController();

router.post("/quiz", quizController.create);
router.get("/quiz", quizController.findAll);

router.get("/quiz/:id", quizController.findQuizForActivity);

export default router;
