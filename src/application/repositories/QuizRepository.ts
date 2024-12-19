import type { QuizEditType, QuizType } from "src/schemas/quiz";
import { prismaClient } from "../../libs/prisma";
import {
  formatQuestionForInsert,
  formatQuestionForUpdate,
} from "src/helpers/quizHelper";
import type { $Enums, Difficulty } from "@prisma/client";

interface QuizActivity {
  id: string;
  title: string;
  difficulty: Difficulty;
  description?: string | null;
  experience?: number | null | undefined;
  created_at: Date;
  user_id: string;
  question: {
    id: string;
    description: string;
    experience?: number | null | undefined;
    quiz_id: string;
    answer: {
      id: string;
      option: string;
      question_id: string;
    }[];
  }[];
}

interface Quiz {
  id: string;
  title: string;
  difficulty: Difficulty;
  description?: string | null;
  experience?: number | null | undefined;
  created_at: Date;
  user_id: string;
  question: {
    id: string;
    description: string;
    experience?: number | null | undefined;
    quiz_id: string;
    answer: {
      id: string;
      option: string;
      isCorrect: boolean;
      question_id: string;
    }[];
  }[];
}

interface QuizList {
  title: string;
  difficulty: $Enums.Difficulty;
  description: string | null;
  experience: number | null;
  user_id: string;
  id: string;
  created_at: Date;
}

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

  async findAll(): Promise<QuizList[]> {
    return await prismaClient.quiz.findMany();
  }

  async findById(id: string): Promise<Quiz> {
    return await prismaClient.quiz.findUniqueOrThrow({
      where: { id },
      include: {
        question: {
          include: {
            answer: true,
          },
        },
      },
    });
  }

  async findForActivity(id: string): Promise<QuizActivity> {
    return await prismaClient.quiz.findUniqueOrThrow({
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
