import express, {} from "express";
import { z } from "zod";
import { hash } from "bcryptjs";
import { prismaClient } from "./application/libs/prisma";
import "express-async-errors";
import { errorHandler } from "./application/middlewares/errorHandler";

const app = express();

app.use(express.json());

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

app.post("/sign-up", async (req, res) => {
  const { name, email, password } = schema.parse(req.body);

  const userAlreadyExists = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (userAlreadyExists) {
    throw new Error("email already exists");
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
});

app.use(errorHandler);

app.listen(3001, () => {
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log("🚀 App running in http://localhost:3001");
});
