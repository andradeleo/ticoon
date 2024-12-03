import { CreateQuizController } from "../../../application/controllers/quiz/CreateQuizController";
import { makeCreateQuizUseCase } from "../useCases/makeCreateQuizUseCase";

export function makeCreateQuizController() {
  const createUseCase = makeCreateQuizUseCase();
  return new CreateQuizController(createUseCase);
}