import { StatusCodes } from 'http-status-codes';

interface HttpError {
    httpCode: number;
}

export class AuthenticationRequiredError extends Error implements HttpError {
    public httpCode: number;

    constructor(message?: string) {
        super(message);

        // TODO Call the extend error thing
        this.httpCode = StatusCodes.FORBIDDEN;
    }
}
