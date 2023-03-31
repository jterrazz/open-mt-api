import { StatusCodes } from 'http-status-codes';

import { ClientError } from './client-error';

export class ForbiddenClientError extends ClientError {
    constructor(publicMessage?: string) {
        publicMessage ||= 'forbidden request';

        super(StatusCodes.FORBIDDEN, publicMessage);
    }
}
