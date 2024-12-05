import { CustomError } from "./CustomError";

export class UserAlreadyExists extends CustomError {
  constructor(
    public statusCode = 400,
    public message = "user already exists",
  ) {
    super(message);
  }
}
