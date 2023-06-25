import { NotFoundError } from '@domain/errors/functional/not-found.error';
import { UnprocessableEntityError } from '@domain/errors/functional/unprocessable-entity.error';
import { InternalServerError } from '@domain/errors/technical/internal-server.error';

type ExposedErrors = NotFoundError | UnprocessableEntityError | InternalServerError;

export class ExposedError extends Error {
    public readonly cause: ExposedErrors;
    public readonly publicMessage?: string;

    constructor(cause: ExposedErrors, publicMessage?: string) {
        super('Exposed error');
        this.cause = cause;
        this.publicMessage = publicMessage;
    }
}
