interface IInput {
  email: string;
  password: string;
}

interface IOutput {
  accessToken: string;
}

export class CreateQuizUseCase {
  async execute(input: IInput): Promise<IOutput> {
    
    return {
      accessToken: "",
    };
  }
}
