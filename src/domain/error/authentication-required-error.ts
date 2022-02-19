import { StatusCodes } from 'http-status-codes';

interface HttpError {
    httpCode: number;
}

// TODO To refacto
export class AuthenticationRequiredError extends Error implements HttpError {
    public httpCode: number;

    constructor(message?: string) {
        super(message);

        this.httpCode = StatusCodes.FORBIDDEN;
    }
}
