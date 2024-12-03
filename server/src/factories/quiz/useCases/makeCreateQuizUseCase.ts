import { CreateQuizUseCase } from "../../../application/useCases/CreateQuizUseCase";

export function makeCreateQuizUseCase() {
  return new CreateQuizUseCase();
}