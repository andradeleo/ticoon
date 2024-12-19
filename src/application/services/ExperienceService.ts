interface IAnswer {
  isCorrect: boolean;
  experience: number | null | undefined;
}

interface IQuestion {
  experience?: number | null | undefined;
}

type experienceType = number | null | undefined;

export class ExperienceService {
  getTotalExperience(
    questions: IQuestion[],
    experience: experienceType,
  ): experienceType {
    const experienceFromQuestions = questions.reduce(
      (total: number, question: IQuestion) => {
        const xp = question.experience ?? 0;
        return total + xp;
      },
      0,
    );

    return experienceFromQuestions > 0 ? experienceFromQuestions : experience;
  }

  sumExperienceFromCorrectAnswers(answers: IAnswer[]): number {
    return answers.reduce((acc, current) => {
      const amountOfExperience = current.experience ?? 0;
      return current.isCorrect ? acc + amountOfExperience : acc + 0;
    }, 0);
  }
}
