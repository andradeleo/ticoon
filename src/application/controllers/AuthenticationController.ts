import { hash } from "bcryptjs";
import { UserAlreadyExists } from "../errors/UserAlreadyExists";
import { prismaClient } from "../libs/prisma";
import { z } from "zod";
import type { Request, Response } from "express";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

class AuthenticationController {
  async signUp(req: Request, res: Response): Promise<void> {
    const { name, email, password } = schema.parse(req.body);

    const userAlreadyExists = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new UserAlreadyExists();
    }

    const hashedPassword = await hash(password, 10);

    await prismaClient.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    res.status(204).json({ message: "sucess" });
  }
}

export default new AuthenticationController();
