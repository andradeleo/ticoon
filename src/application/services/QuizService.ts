import { quizSchema, type QuizType } from "src/schemas/quiz";
import type { QuizRepository } from "../repositories/QuizRepository";
import type { ExperienceService } from "./ExperienceService";

export class QuizService {
  constructor(
    private readonly quizRepository: QuizRepository,
    private readonly experienceService: ExperienceService,
  ) {}

  async create(quiz: QuizType): Promise<void> {
    const { title, difficulty, description, questions, experience, user_id } =
      quizSchema.parse(quiz);

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

    const totalExperience = this.experienceService.getTotalExperience(
      questions,
      experience,
    );

    await this.quizRepository.create({
      title,
      difficulty,
      description,
      questions: formattedQuestions,
      experience: totalExperience,
      user_id,
    });
  }

  // biome-ignore lint/nursery/useExplicitType: <explanation>
  async findAll() {
    return await this.quizRepository.findAll();
  }
}
