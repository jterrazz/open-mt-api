export type Controller<Input, Output> = (input: Input) => Promise<Output>;
