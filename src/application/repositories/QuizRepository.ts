import type { QuizType } from "src/schemas/quiz";
import { prismaClient } from "../libs/prisma";
import type { IOutput } from "../interfaces/output";

export class QuizRepository {
  async create(quiz: QuizType): Promise<void> {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const formattedQuestions = quiz.questions.map((question: any) => ({
      description: question.description,
      experience: question.experience,
      answer: {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        create: question.answers.map((answer: any) => ({
          option: answer.option,
          isCorrect: answer.isCorrect,
        })),
      },
    }));

    await prismaClient.quiz.create({
      data: {
        title: quiz.title,
        difficulty: quiz.difficulty,
        description: quiz.description,
        question: {
          create: formattedQuestions,
        },
        experience: quiz.experience,
        user_id: quiz.user_id,
      },
    });
  }

  async findAll(): Promise<IOutput> {
    const quizzes = await prismaClient.quiz.findMany();
    return {
      statusCode: 200,
      body: {
        success: true,
        data: quizzes,
        count: quizzes.length,
      },
    };
  }
}
