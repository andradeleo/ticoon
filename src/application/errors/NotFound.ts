import { CustomError } from "./CustomError";

export class NotFound extends CustomError {
  constructor(
    public statusCode = 404,
    public message = "Resource not Found",
  ) {
    super(message);
  }
}
