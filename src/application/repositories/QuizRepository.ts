import type { answerType, QuestionType, QuizType } from "src/schemas/quiz";
import { prismaClient } from "../libs/prisma";
import type { IOutput } from "../interfaces/output";

export class QuizRepository {
  async create(quiz: QuizType): Promise<void> {
    const formattedQuestions = quiz.questions.map((question: QuestionType) => ({
      description: question.description,
      experience: question.experience,
      answer: {
        create: question.answers.map((answer: answerType) => ({
          option: answer.option,
          isCorrect: answer.isCorrect,
        })),
      },
    }));

    await prismaClient.quiz.create({
      data: {
        title: quiz.title,
        user_id: quiz.user_id,
        experience: quiz.experience,
        difficulty: quiz.difficulty,
        description: quiz.description,
        question: {
          create: formattedQuestions,
        },
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
