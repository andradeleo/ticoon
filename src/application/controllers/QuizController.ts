import type { Request, Response } from "express";
import { QuizService } from "../services/QuizService";
import { QuizRepository } from "../repositories/QuizRepository";

class QuizController {
  constructor(private quizService: QuizService) {
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
  }

  async create(req: Request, res: Response): Promise<void> {
    const quiz = await this.quizService.create(req.body);
    res.status(201).json({ data: quiz });
  }

  async findAll(_: Request, res: Response): Promise<void> {
    const quizzes = await this.quizService.findAll();
    res.status(200).json({ data: quizzes });
  }
}

export default new QuizController(new QuizService(new QuizRepository()));
