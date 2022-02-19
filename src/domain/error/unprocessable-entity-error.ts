import { StatusCodes } from 'http-status-codes';
// TODO To refacto
export class UnprocessableEntityError extends Error {
    public code: number;

    constructor(message?: string) {
        super(message);
        this.code = StatusCodes.UNPROCESSABLE_ENTITY;
    }
}
