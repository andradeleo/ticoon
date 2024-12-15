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

router.put("/quiz/:id", quizController.updateQuiz);

router.post("/submit-quiz/:id", quizController.submit);

export default router;
