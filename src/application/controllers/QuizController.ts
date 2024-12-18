import type { Request, Response } from "express";
import type { QuizService } from "../services/QuizService";

export class QuizController {
  constructor(private quizService: QuizService) {
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findForActivity = this.findForActivity.bind(this);
    this.update = this.update.bind(this);
    this.submit = this.submit.bind(this);
  }

  async create(req: Request, res: Response): Promise<void> {
    const result = await this.quizService.create(req.body);
    res.status(result.statusCode).json(result.body);
  }

  async findAll(_: Request, res: Response): Promise<void> {
    const result = await this.quizService.findAll();
    res.status(result.statusCode).json(result.body);
  }

  async findForActivity(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const result = await this.quizService.findForActivity(id);
    res.status(result.statusCode).json(result.body);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const result = await this.quizService.update(req.body, id);
    res.status(result.statusCode).json(result.body);
  }

  async submit(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const result = await this.quizService.submit(req.body, id);
    res.status(result.statusCode).json(result.body);
  }
}
