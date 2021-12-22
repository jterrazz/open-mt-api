import { StatusCodes } from 'http-status-codes';

export class AuthenticationRequiredError extends Error {
    public code: number;

    constructor(message?: string) {
        super(message);

        // TODO Call the extend error thing
        this.code = StatusCodes.FORBIDDEN;
    }
}
