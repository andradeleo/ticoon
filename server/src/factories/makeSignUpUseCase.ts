import { SignUpUseCase } from "../application/useCases/SignUpUseCase";

export function makeSignUpUseCase() {
  return new SignUpUseCase();
}
