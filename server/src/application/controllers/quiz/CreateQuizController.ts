import { z } from "zod";
import { IController, IResponse } from "../../interfaces/IController";
import { IRequest } from "../../interfaces/IRequest";

const answerSchema = z.object({
  option: z.string().min(2),
  isCorrect: z.boolean(),
})

const questionSchema = z.object({
  name: z.string().min(8),
  answers: z.array(answerSchema).min(2).refine((answers) => answers.filter(a => a.isCorrect).length === 1),
  experience: z.number().gte(1).optional(),
});

const schema = z.object({
  title: z.string().min(4),
  description: z.string().min(24).optional(),
  questions: z.array(questionSchema).min(3),
  experience: z.number().gte(1),
  organization_id: z.string().uuid(),
})


export class CreateQuizController implements IController {
  async handle({ body }: IRequest): Promise<IResponse> {
    const result = schema.safeParse(body);

    return {
      statusCode: 204,
      body: null,
    };
  }

}