export interface IOutput {
  statusCode: number;
  body: {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    data: any;
    success: boolean;
    count?: number;
  };
}
