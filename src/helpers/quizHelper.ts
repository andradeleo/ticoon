import type { answerType, QuestionType } from "src/schemas/quiz";

interface ICreateQuestionsWithAnswersItem {
  description: string;
  experience: number | null | undefined;
  answer: {
    create: {
      option: string;
      isCorrect: boolean;
    }[];
  };
}

export function formatQuestionForInsert(
  questions: QuestionType[],
): ICreateQuestionsWithAnswersItem[] {
  return questions.map((question: QuestionType) => ({
    description: question.description,
    experience: question.experience,
    answer: {
      create: question.answers.map((answer: answerType) => ({
        option: answer.option,
        isCorrect: answer.isCorrect,
      })),
    },
  }));
}
