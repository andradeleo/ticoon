import { z } from "zod";

export const schemaSignUp = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type signUpType = z.infer<typeof schemaSignUp>;

export const schemaSignIn = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type signInType = z.infer<typeof schemaSignIn>;
