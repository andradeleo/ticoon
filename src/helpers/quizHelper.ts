import type {
  answerType,
  QuestionEditType,
  QuestionType,
} from "src/schemas/quiz";

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

interface IUpdateQuestionsWithAnswersItem {
  id: string;
  description: string;
  experience: number | null | undefined;
  answer: {
    updateMany: {
      where: { id: string };
      data: {
        option: string;
        isCorrect: boolean;
      };
    }[];
  };
}

export function formatQuestionForUpdate(
  questions: QuestionEditType[],
): IUpdateQuestionsWithAnswersItem[] {
  return questions.map((question: QuestionEditType) => ({
    id: question.id,
    description: question.description,
    experience: question.experience,
    answer: {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      updateMany: question.answers.map((answer: any) => ({
        where: { id: answer.id },
        data: {
          option: answer.option,
          isCorrect: answer.isCorrect,
        },
      })),
    },
  }));
}
