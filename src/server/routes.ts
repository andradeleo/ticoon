import { Router } from "express";
import AuthenticationController from "src/application/controllers/AuthenticationController";
import { prismaClient } from "src/application/libs/prisma";
import { z } from "zod";

const router = Router();

router.post("/sign-up", AuthenticationController.signUp);
router.post("/sign-in", AuthenticationController.signIn);

const schemaAnswer = z.object({
  option: z.string(),
  isCorrect: z.boolean(),
});

const schemaQuestion = z.object({
  description: z.string(),
  experience: z.number().gte(1).optional(),
  answers: z.array(schemaAnswer),
});

const schema = z.object({
  title: z.string(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  description: z.string().optional(),
  questions: z.array(schemaQuestion),
  experience: z.number().gte(1).optional(),
  user_id: z.string().uuid(),
});

router.post("/quiz", async (req, res) => {
  const { title, difficulty, description, questions, experience, user_id } =
    schema.parse(req.body);

  const formattedQuestions = questions.map((question) => ({
    description: question.description,
    experience: question.experience,
    answer: {
      create: question.answers.map((answer) => ({
        option: answer.option,
        isCorrect: answer.isCorrect,
      })),
    },
  }));

  const quiz = await prismaClient.quiz.create({
    data: {
      title,
      difficulty,
      description,
      question: {
        create: formattedQuestions,
      },
      experience,
      user_id,
    },
  });

  res.status(201).json({ data: quiz });
});

export default router;
