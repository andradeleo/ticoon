import { quizSchema, type QuizType } from "src/schemas/quiz";
import type { QuizRepository } from "../repositories/QuizRepository";

export class QuizService {
  constructor(private readonly quizRepository: QuizRepository) {}

  async create(quiz: QuizType): Promise<void> {
    const { title, difficulty, description, questions, experience, user_id } =
      quizSchema.parse(quiz);

    let xp: number | null = 0;

    const formattedQuestions = questions.map((question) => ({
      description: question.description,
      experience: question.experience,
      answer: {
        create: question.answers.map((answer) => ({
          option: answer.option,
          isCorrect: answer.isCorrect,
        })),
      },
    }));

    const totalExperience = formattedQuestions.reduce(
      (total, { experience }) => {
        const xp = experience ?? 0;
        return total + xp;
      },
      0,
    );

    if (totalExperience && experience) {
      const isValid = totalExperience === experience;
      if (!isValid) {
        throw new Error(
          "The question experience sum should match quiz experience",
        );
      }
    }

    if (totalExperience) {
      xp = totalExperience;
    } else if (experience) {
      xp = experience;
    } else {
      xp = null;
    }

    await this.quizRepository.create({
      title,
      difficulty,
      description,
      questions: formattedQuestions,
      experience: xp,
      user_id,
    });
  }

  // biome-ignore lint/nursery/useExplicitType: <explanation>
  async findAll() {
    return await this.quizRepository.findAll();
  }
}
