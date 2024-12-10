import { Router } from "express";
import AuthenticationController from "src/application/controllers/AuthenticationController";
import { makeQuizController } from "src/factories/makeQuizController";

const router = Router();

router.post("/sign-up", AuthenticationController.signUp);
router.post("/sign-in", AuthenticationController.signIn);

const quizController = makeQuizController();

router.post("/quiz", quizController.create);
router.get("/quiz", quizController.findAll);

export default router;
