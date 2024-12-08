import type { signUpType } from "src/schemas/authentication";
import { prismaClient } from "../libs/prisma";

export class AuthenticationRepository {
  // biome-ignore lint/nursery/useExplicitType: <explanation>
  async create({ email, name, password }: signUpType) {
    return await prismaClient.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }
  // biome-ignore lint/nursery/useExplicitType: <explanation>
  async findUserByEmail(email: string) {
    return await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
  }
}
