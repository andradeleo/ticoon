import { CustomError } from "./CustomError";

export class InvalidCredentials extends CustomError {
  constructor(
    public statusCode = 401,
    public message = "Invalid credentials",
  ) {
    super(message);
  }
}
