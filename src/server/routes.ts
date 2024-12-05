import { Router } from "express";
import AuthenticationController from "src/application/controllers/AuthenticationController";
import QuizController from "src/application/controllers/QuizController";

const router = Router();

router.post("/sign-up", AuthenticationController.signUp);
router.post("/sign-in", AuthenticationController.signIn);

router.post("/quiz", QuizController.create);
router.get("/quiz", QuizController.findAll);
router.get("/quiz/:id", QuizController.findById);

export default router;
