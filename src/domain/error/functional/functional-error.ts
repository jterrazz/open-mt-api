import { StatusCodes } from 'http-status-codes';

export class FunctionalError extends Error {
    public httpCode: StatusCodes;
    public code: string | null;

    constructor(
        httpCode: StatusCodes,
        code: string | null,
        publicMessage?: string,
    ) {
        super(publicMessage);

        this.httpCode = httpCode;
        this.code = code;
    }
}
