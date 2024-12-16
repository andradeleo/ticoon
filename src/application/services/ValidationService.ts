import type { SubmittedQuestionType } from "src/schemas/quiz";

export class ValidationService {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  public correctAnswers: any;

  public validateQuestion(
    submittedQuestions: SubmittedQuestionType[],
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    createdQuestions: any,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ): any {
    this.correctAnswers = this.setCorrectAnswers(createdQuestions);

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const resp: any = [];

    const submitted = this.setCorrectAnswers(submittedQuestions);

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    // biome-ignore lint/complexity/noForEach: <explanation>
    this.correctAnswers.forEach((answer: any, index: number) => {
      const answerId = answer.answer_id;

      const response = submitted[index];

      resp.push({
        user_answer: response.answer_id,
        quiz_answer: answerId,
        isCorrect: response.answer_id === answerId,
      });
    });

    return {
      answers: resp,
      numberOfCorrectQuestions: resp.filter(
        (res: { isCorrect: boolean }) => res.isCorrect === true,
      ).length,
    };
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  public setCorrectAnswers(questions: any): {
    question_id: string;
    answer_id: string;
  }[] {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return questions.map((qst: any) => {
      const questionId = qst.id;

      const answer = Array.isArray(qst.answer)
        ? qst.answer.find(
            (ans: { isCorrect: boolean }) => ans.isCorrect === true,
          )
        : {
            id: qst.answer,
          };

      return {
        question_id: questionId,
        answer_id: answer.id,
      };
    });
  }
}
