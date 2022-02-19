import { FunctionalError } from '@domain/error/functional/functional-error';
import { StatusCodes } from 'http-status-codes';

export class NotFoundError extends FunctionalError {
    constructor(publicMessage?: string) {
        super(StatusCodes.NOT_FOUND, null, publicMessage);
    }
}
