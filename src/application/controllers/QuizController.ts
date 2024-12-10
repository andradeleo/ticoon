import type { Request, Response } from "express";
import { QuizService } from "../services/QuizService";
import { QuizRepository } from "../repositories/QuizRepository";
import { ExperienceService } from "../services/ExperienceService";

class QuizController {
  constructor(private quizService: QuizService) {
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
  }

  async create(req: Request, res: Response): Promise<void> {
    const result = await this.quizService.create(req.body);
    res.status(result.statusCode).json(result.body);
  }

  async findAll(_: Request, res: Response): Promise<void> {
    const result = await this.quizService.findAll();
    res.status(result.statusCode).json(result.body);
  }
}

export default new QuizController(
  new QuizService(new QuizRepository(), new ExperienceService()),
);
