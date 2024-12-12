import type { Request, Response } from "express";
import type { QuizService } from "../services/QuizService";

export class QuizController {
  constructor(private quizService: QuizService) {
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findQuizForActivity = this.findQuizForActivity.bind(this);
  }

  async create(req: Request, res: Response): Promise<void> {
    const result = await this.quizService.create(req.body);
    res.status(result.statusCode).json(result.body);
  }

  async findAll(_: Request, res: Response): Promise<void> {
    const result = await this.quizService.findAll();
    res.status(result.statusCode).json(result.body);
  }

  async findQuizForActivity(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const result = await this.quizService.findQuizForActivity(id);
    res.status(result.statusCode).json(result.body);
  }
}
