import type { signUpType } from "src/schemas/authentication";
import { prismaClient } from "../../libs/prisma";
import type { IOutput } from "../interfaces/output";

export class AuthenticationRepository {
  async create({ email, name, password }: signUpType): Promise<void> {
    await prismaClient.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }

  async findUserByEmail(email: string): Promise<IOutput> {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    return {
      statusCode: 200,
      body: {
        success: true,
        data: {
          user: user as signUpType,
        },
      },
    };
  }
}
