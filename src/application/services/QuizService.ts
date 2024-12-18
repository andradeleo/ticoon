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
import type { UserRepository } from "../repositories/UserRepository";
import { NotFound } from "../errors/NotFound";

export class QuizService {
  constructor(
    private readonly quizRepository: QuizRepository,
    private readonly experienceService: ExperienceService,
    private readonly validationService: ValidationService,
    private readonly userRepository: UserRepository,
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

  async findForActivity(id: string): Promise<IOutput> {
    const { body } = await this.quizRepository.findForActivity(id);
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

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const questions = x.question.map((qst: any, index: number) => {
      return {
        ...qst,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        answer: qst.answer.map((ans: any) => {
          return {
            ...ans,
            answer_marked: correctAnswers.answers[index].user_answer === ans.id,
          };
        }),
        isCorrect: correctAnswers.answers[index].isCorrect,
      };
    });

    const userExperienceGained =
      this.experienceService.sumExperienceFromCorrectAnswers(
        correctAnswers.answers,
      );

    const user = await this.userRepository.findById(quiz.user_id);

    if (!user) {
      throw new NotFound();
    }

    await this.userRepository.UpdateExperience(
      user.level + userExperienceGained,
      user.id,
    );

    const validatedQuiz = {
      ...x,
      question: questions,
    };

    return {
      statusCode: 200,
      body: {
        success: true,
        data: {
          quiz: validatedQuiz,
          experience: userExperienceGained,
        },
      },
    };
  }
}
