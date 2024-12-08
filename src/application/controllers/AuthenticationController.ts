import type { Request, Response } from "express";
import { AuthenticationService } from "../services/AuthenticationService";
import { AuthenticationRepository } from "../repositories/AuthenticationRepository";

class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  async signUp(req: Request, res: Response): Promise<void> {
    const user = await this.authenticationService.signUp(req.body);
    res.status(204).json({ message: "sucess", body: user });
  }

  async signIn(req: Request, res: Response): Promise<void> {
    const accessToken = await this.authenticationService.signIn(req.body);
    res.status(200).json({ accessToken });
  }
}

export default new AuthenticationController(
  new AuthenticationService(new AuthenticationRepository()),
);
