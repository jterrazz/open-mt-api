import { ClientError } from '@domain/error/client/client-error';
import { StatusCodes } from 'http-status-codes';

export class NotFoundError extends ClientError {
    constructor(publicMessage?: string) {
        publicMessage ||= 'not found';

        super(StatusCodes.NOT_FOUND, publicMessage);
    }
}
