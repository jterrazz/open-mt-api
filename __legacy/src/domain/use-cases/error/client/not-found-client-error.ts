import { StatusCodes } from 'http-status-codes';

import { ClientError } from './client-error';

export class NotFoundClientError extends ClientError {
    constructor(publicMessage?: string) {
        publicMessage ||= 'not found';

        super(StatusCodes.NOT_FOUND, publicMessage);
    }
}
