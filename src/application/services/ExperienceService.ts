export class ExperienceService {
  private experience: number | null = 0;
  private readonly EXPERIENCE_MULTIPLY = 0.25;
  private readonly LEVEL_STEP = 1000;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  getTotalExperience(questions: any, experience: any): number | null {
    const experienceFromQuestions = questions.reduce(
      (total: number, { experience }: { experience: number }) => {
        const xp = experience ?? 0;
        return total + xp;
      },
      0,
    );

    const total =
      experienceFromQuestions > 0 ? experienceFromQuestions : experience;

    this.experience = total;

    return this.experience;
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  sumExperienceFromCorrectAnswers(answers: any[]): number {
    return answers.reduce((acc, current) => {
      return current.isCorrect ? acc + current.experience : acc + 0;
    }, 0);
  }

  calculateUserExperienceGained(
    experience: number,
    user_level: number,
  ): number {
    return (experience * this.EXPERIENCE_MULTIPLY) / user_level;
  }

  tranformExperiencIntoLevel(experience: number): number {
    return Math.floor(experience / this.LEVEL_STEP);
  }
}
