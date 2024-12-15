import { QuizController } from "src/application/controllers/QuizController";
import { QuizRepository } from "src/application/repositories/QuizRepository";
import { ExperienceService } from "src/application/services/ExperienceService";
import { QuizService } from "src/application/services/QuizService";
import { ValidationService } from "src/application/services/ValidationService";

export function makeQuizController(): QuizController {
  const experienceService = new ExperienceService();
  const validationService = new ValidationService();
  const quizRepository = new QuizRepository();

  const quizService = new QuizService(
    quizRepository,
    experienceService,
    validationService,
  );

  return new QuizController(quizService);
}
