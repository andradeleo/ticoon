import { compare, hash } from "bcryptjs";
import { UserAlreadyExists } from "../errors/UserAlreadyExists";
import { prismaClient } from "../libs/prisma";
import { z } from "zod";
import type { Request, Response } from "express";
import { sign } from "jsonwebtoken";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

const schameSignIn = z.object({
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

  async signIn(req: Request, res: Response): Promise<void> {
    const { email, password } = schameSignIn.parse(req.body);

    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const accessToken = sign(
      { sub: user.id },
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );

    res.status(200).json({ accessToken });
  }
}

export default new AuthenticationController();
