import { z } from "zod";
import { prismaClient } from "../libs/prisma";
import type { Request, Response } from "express";
import { NotFound } from "../errors/NotFound";

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

const schemaUUID = z.object({
  id: z.string().uuid(),
});

class QuizController {
  async create(req: Request, res: Response): Promise<void> {
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
  }

  async findAll(_: Request, res: Response): Promise<void> {
    const allQuizzes = await prismaClient.quiz.findMany();
    res.status(200).json({ data: allQuizzes });
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = schemaUUID.parse(req.params);

    const quiz = await prismaClient.quiz.findUnique({
      where: {
        id,
      },
      include: {
        question: {
          select: {
            id: true,
            description: true,
            experience: true,
            answer: {
              select: {
                id: true,
                option: true,
              },
            },
          },
        },
      },
    });

    if (!quiz) {
      throw new NotFound(404, "Quiz not found");
    }

    res.status(200).json(quiz);
  }
}

export default new QuizController();
