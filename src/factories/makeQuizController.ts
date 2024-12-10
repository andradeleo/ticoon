import { QuizController } from "src/application/controllers/QuizController";
import { QuizRepository } from "src/application/repositories/QuizRepository";
import { ExperienceService } from "src/application/services/ExperienceService";
import { QuizService } from "src/application/services/QuizService";

export function makeQuizController(): QuizController {
  const experienceService = new ExperienceService();
  const quizRepository = new QuizRepository();
  const quizService = new QuizService(quizRepository, experienceService);
  return new QuizController(quizService);
}
