import { prismaClient } from "../../libs/prisma";

interface IUser {
  name: string;
  id: string;
  email: string;
  password: string;
  level: number;
}

export class UserRepository {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async findById(id: string): Promise<IUser | null> {
    return await prismaClient.user.findUnique({
      where: {
        id,
      },
    });
  }

  async UpdateExperience(experience: number, user_id: string): Promise<void> {
    await prismaClient.user.update({
      where: {
        id: user_id,
      },
      data: {
        level: experience,
      },
    });
  }
}
