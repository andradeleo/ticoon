import { z } from "zod";

const answerSchema = z.object({
  option: z.string(),
  isCorrect: z.boolean(),
});

const questionSchema = z.object({
  description: z.string(),
  experience: z.number().nullable().optional(),
  answers: z.array(answerSchema).min(2),
});

export const quizSchema = z.object({
  title: z.string(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  description: z.string().optional(),
  questions: z.array(questionSchema).min(2),
  experience: z.number().nullable().optional(),
  user_id: z.string().uuid(),
});

export type answerType = z.infer<typeof answerSchema>;
export type QuestionType = z.infer<typeof questionSchema>;
export type QuizType = z.infer<typeof quizSchema>;
