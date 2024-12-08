import { prismaClient } from "../libs/prisma";

export class QuizRepository {
  // biome-ignore lint/nursery/useExplicitType: <explanation>
  async create({
    title,
    difficulty,
    description,
    questions,
    experience,
    user_id,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  }: any) {
    await prismaClient.quiz.create({
      data: {
        title,
        difficulty,
        description,
        question: {
          create: questions,
        },
        experience,
        user_id,
      },
    });
  }

  // biome-ignore lint/nursery/useExplicitType: <explanation>
  async findAll() {
    return await prismaClient.quiz.findMany();
  }
}
