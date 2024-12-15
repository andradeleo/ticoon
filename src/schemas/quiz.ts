import { z } from "zod";

const answerSchema = z.object({
  option: z.string(),
  isCorrect: z.boolean(),
});

export const questionSchema = z.object({
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

export type AnswerType = z.infer<typeof answerSchema>;
export type QuestionType = z.infer<typeof questionSchema>;
export type QuizType = z.infer<typeof quizSchema>;

const answerEditSchema = z.object({
  id: z.string().uuid(),
  option: z.string(),
  isCorrect: z.boolean(),
});

const questionEditSchema = z.object({
  id: z.string().uuid(),
  description: z.string(),
  experience: z.number().nullable().optional(),
  answers: z.array(answerEditSchema).min(2),
  quiz_id: z.string().uuid(),
});

export const quizEditSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  description: z.string().optional(),
  questions: z.array(questionEditSchema).min(2),
  experience: z.number().nullable().optional(),
  created_at: z.string(),
  user_id: z.string().uuid(),
});

export type answerEditType = z.infer<typeof answerEditSchema>;
export type QuestionEditType = z.infer<typeof questionEditSchema>;
export type QuizEditType = z.infer<typeof quizEditSchema>;

export const submittedQuestionSchema = z.object({
  id: z.string().uuid(),
  answer: z.string().uuid(),
});

export const submittedQuizSchema = z.object({
  question: z.array(submittedQuestionSchema).min(2),
  user_id: z.string().uuid(),
});

export type SubmittedQuestionType = z.infer<typeof submittedQuestionSchema>;
export type SubmittedQuizType = z.infer<typeof submittedQuizSchema>;
