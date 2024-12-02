import { prismaClient } from "../libs/prismaClient";
import { AccountAlreadyExists } from "../errors/AccountAlreadyExists";
import { hash } from "bcryptjs";

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignUpUseCase {
  async execute({ email, name, password }: IInput): Promise<IOutput> {
    const accountAlreadyExists = await prismaClient.account.findUnique({
      where: {
        email,
      },
    });

    if (accountAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    const hashedPassword = await hash(password, 10);

    await prismaClient.account.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "USER",
      },
    });
  }
}
