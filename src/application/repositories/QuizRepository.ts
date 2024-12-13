import type { QuizEditType, QuizType } from "src/schemas/quiz";
import { prismaClient } from "../../libs/prisma";
import type { IOutput } from "../interfaces/output";
import {
  formatQuestionForInsert,
  formatQuestionForUpdate,
} from "src/helpers/quizHelper";

export class QuizRepository {
  async create(quiz: QuizType): Promise<void> {
    const questions = formatQuestionForInsert(quiz.questions);

    await prismaClient.quiz.create({
      data: {
        title: quiz.title,
        user_id: quiz.user_id,
        experience: quiz.experience,
        difficulty: quiz.difficulty,
        description: quiz.description,
        question: {
          create: questions,
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

  async findQuizForActivity(id: string): Promise<IOutput> {
    const quiz = await prismaClient.quiz.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        question: {
          include: {
            answer: {
              select: {
                id: true,
                option: true,
                question_id: true,
              },
            },
          },
        },
      },
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        data: quiz,
      },
    };
  }

  async update(quiz: QuizEditType, id: string): Promise<void> {
    const questions = formatQuestionForUpdate(quiz.questions);

    await prismaClient.quiz.update({
      where: {
        id: id,
      },
      data: {
        title: quiz.title,
        user_id: quiz.user_id,
        experience: quiz.experience,
        difficulty: quiz.difficulty,
        description: quiz.description,
        question: {
          update: questions.map((question) => ({
            where: { id: question.id },
            data: {
              description: question.description,
              experience: question.experience,
              answer: {
                updateMany: question.answer.updateMany,
              },
            },
          })),
        },
      },
    });
  }
}
