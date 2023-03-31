import { StatusCodes } from 'http-status-codes';

import { ClientError } from './client-error';

export class AuthenticationRequiredClientError extends ClientError {
    constructor(publicMessage?: string) {
        publicMessage ||= 'authentication required';

        super(StatusCodes.UNAUTHORIZED, publicMessage);
    }
}
