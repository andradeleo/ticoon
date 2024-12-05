export abstract class CustomError extends Error {
  public abstract statusCode: number;
  public abstract message: string;
}
