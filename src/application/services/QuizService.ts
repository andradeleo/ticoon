import {
  quizEditSchema,
  quizSchema,
  submittedQuizSchema,
  type QuizType,
  type SubmittedQuizType,
} from "src/schemas/quiz";
import type { QuizRepository } from "../repositories/QuizRepository";
import type { ExperienceService } from "./ExperienceService";
import type { IOutput } from "../interfaces/output";
import type { ValidationService } from "./ValidationService";

export class QuizService {
  constructor(
    private readonly quizRepository: QuizRepository,
    private readonly experienceService: ExperienceService,
    private readonly validationService: ValidationService,
  ) {}

  async create(quiz: QuizType): Promise<IOutput> {
    const { title, difficulty, description, questions, experience, user_id } =
      quizSchema.parse(quiz);

    const totalExperience = this.experienceService.getTotalExperience(
      questions,
      experience,
    );

    await this.quizRepository.create({
      title,
      difficulty,
      description,
      questions,
      experience: totalExperience,
      user_id,
    });

    return {
      statusCode: 201,
      body: {
        success: true,
        data: null,
      },
    };
  }

  async findAll(): Promise<IOutput> {
    const { body } = await this.quizRepository.findAll();
    return {
      statusCode: 200,
      body,
    };
  }

  async findQuizForActivity(id: string): Promise<IOutput> {
    const { body } = await this.quizRepository.findQuizForActivity(id);
    return {
      statusCode: 200,
      body,
    };
  }

  async update(quiz: QuizType, id: string): Promise<IOutput> {
    const parsedQuiz = quizEditSchema.parse(quiz);

    const totalExperience = this.experienceService.getTotalExperience(
      parsedQuiz.questions,
      parsedQuiz.experience,
    );

    await this.quizRepository.update(
      {
        ...parsedQuiz,
        experience: totalExperience,
      },
      id,
    );

    return {
      statusCode: 200,
      body: {
        success: true,
        data: null,
      },
    };
  }

  async submit(quiz: SubmittedQuizType, id: string): Promise<IOutput> {
    const { question } = submittedQuizSchema.parse(quiz);
    const createdQuiz = await this.quizRepository.findById(id);

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const x = createdQuiz.body.data as any;
    const createdQuestions = x.question;

    const correctAnswers = this.validationService.validateQuestion(
      question,
      createdQuestions,
    );

    // validar se as repostas estão corretas

    return {
      statusCode: 200,
      body: {
        success: true,
        data: correctAnswers,
      },
    };
  }
}
