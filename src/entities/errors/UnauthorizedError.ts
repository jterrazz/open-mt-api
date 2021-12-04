import { StatusCodes } from 'http-status-codes';

export enum UnauthorizedErrorName {
    IBAN_DOES_NOT_BELONG_TO_AUTHENTICATED_USER = 'iban_does_not_belong_to_authenticated_user',
}

export class UnauthorizedError extends Error {
    public identifier: UnauthorizedErrorName;
    public code: number;

    constructor(message?: string, identifier?: UnauthorizedErrorName) {
        super(message);
        this.code = StatusCodes.UNAUTHORIZED;

        if (identifier) this.identifier = identifier;
    }
}
