import { StatusCodes } from 'http-status-codes';

export class AuthenticationRequiredError extends Error {
    public code: number;

    constructor(message?: string) {
        super(message);
        this.code = StatusCodes.FORBIDDEN;
    }
}
