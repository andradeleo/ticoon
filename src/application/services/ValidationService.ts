import type { SubmittedQuestionType } from "src/schemas/quiz";

interface IAnswerCheck {
  id: string;
  isCorrect: boolean;
}

export interface IQuestionCheck {
  id: string;
  answer: IAnswerCheck[] | string;
  experience?: number | null | undefined;
}

interface ICorrectAnswers {
  question_id: string;
  answer_id: string;
  experience?: number | null | undefined;
}

interface IAnswers {
  user_answer: string;
  quiz_answer: string;
  isCorrect: boolean;
  experience: number | null | undefined;
}

interface IUserAnswers {
  answers: IAnswers[];
  numberOfCorrectQuestions: number;
}

export class ValidationService {
  public validateQuestion(
    submittedQuestions: SubmittedQuestionType[],
    createdQuestions: IQuestionCheck[],
  ): IUserAnswers {
    const correctAnswers = this.setCorrectAnswers(createdQuestions);
    const userSubmittedAnswers = this.setCorrectAnswers(submittedQuestions);

    const relationCorrectQuestionsAnswers = correctAnswers.map(
      (answer: ICorrectAnswers, index: number) => {
        const answerId = answer.answer_id;
        const response = userSubmittedAnswers[index];

        return {
          user_answer: response.answer_id,
          quiz_answer: answerId,
          isCorrect: response.answer_id === answerId,
          experience: answer.experience,
        };
      },
    );

    return {
      answers: relationCorrectQuestionsAnswers,
      numberOfCorrectQuestions: relationCorrectQuestionsAnswers.filter(
        (res: IAnswers) => res.isCorrect === true,
      ).length,
    };
  }

  public setCorrectAnswers(questions: IQuestionCheck[]): ICorrectAnswers[] {
    return questions.map((qst: IQuestionCheck) => {
      const questionId = qst.id;

      const answer = Array.isArray(qst.answer)
        ? qst.answer.find((ans: IAnswerCheck) => ans.isCorrect === true)
        : {
            id: qst.answer,
          };

      if (!answer) {
        throw new Error("Correct answer not found!");
      }

      return {
        question_id: questionId,
        answer_id: answer.id,
        experience: qst?.experience,
      };
    });
  }
}
