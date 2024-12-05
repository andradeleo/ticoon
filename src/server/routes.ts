import { Router } from "express";
import AuthenticationController from "src/application/controllers/AuthenticationController";

const router = Router();

router.post("/sign-up", AuthenticationController.signUp);
router.post("/sign-in", AuthenticationController.signIn);

export default router;
