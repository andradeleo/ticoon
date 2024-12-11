import type { Request, Response } from "express";
import type { AuthenticationService } from "../services/AuthenticationService";

export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  async signUp(req: Request, res: Response): Promise<void> {
    const result = await this.authenticationService.signUp(req.body);
    res.status(result.statusCode).json(result.body);
  }

  async signIn(req: Request, res: Response): Promise<void> {
    const result = await this.authenticationService.signIn(req.body);
    res.status(result.statusCode).json(result.body);
  }
}
