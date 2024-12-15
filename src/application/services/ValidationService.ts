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
    this.setCorrectAnswers(createdQuestions);

    let result = 0;
    let experience = 0;

    // biome-ignore lint/complexity/noForEach: <explanation>
    submittedQuestions.forEach((question) => {
      const isCorrect = this.correctAnswers.includes(question.answer);

      if (isCorrect) {
        result += 1;
        experience += question?.experience ? question?.experience : 0;
      }
    });

    return {
      correct_answers: result,
      experience,
    };
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  public setCorrectAnswers(answers: any): void {
    const correctAnswersId: string[] = [];
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const correctAnswers = answers.flatMap((qst: any) =>
      qst.answer.filter(
        (ans: { isCorrect: boolean }) => ans.isCorrect === true,
      ),
    );

    // biome-ignore lint/complexity/noForEach: <explanation>
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    correctAnswers.forEach((ans: any) => {
      correctAnswersId.push(ans.id);
    });

    this.correctAnswers = correctAnswersId;
  }
}
