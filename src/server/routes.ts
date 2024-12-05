import { Router } from "express";
import AuthenticationController from "src/application/controllers/AuthenticationController";
import { prismaClient } from "src/application/libs/prisma";
import { z } from "zod";

const router = Router();

router.post("/sign-up", AuthenticationController.signUp);
router.post("/sign-in", AuthenticationController.signIn);

const schema = z.object({
  title: z.string(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  description: z.string().optional(),
  experience: z.number().gte(1).optional(),
  user_id: z.string().uuid(),
});

router.post("/quiz", async (req, res) => {
  const { title, difficulty, description, experience, user_id } = schema.parse(
    req.body,
  );

  const quiz = await prismaClient.quiz.create({
    data: {
      title,
      difficulty,
      description,
      experience,
      user_id,
    },
  });

  res.status(201).json({ data: quiz });
});

export default router;
