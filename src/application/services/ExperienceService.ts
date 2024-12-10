export class ExperienceService {
  private experience: number | null = 0;
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
}
