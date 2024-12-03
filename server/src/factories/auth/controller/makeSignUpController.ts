import { SignUpController } from "../../../application/controllers/SignUpController";
import { makeSignUpUseCase } from "../useCase/makeSignUpUseCase";

export function makeSignUpController() {
  const signUpUseCase = makeSignUpUseCase();
  return new SignUpController(signUpUseCase);
}
