import { ClientError } from '@domain/error/client/client-error';
import { StatusCodes } from 'http-status-codes';

export class AuthenticationRequiredError extends ClientError {
    constructor(publicMessage?: string) {
        publicMessage ||= 'authentication required';

        super(StatusCodes.FORBIDDEN, publicMessage);
    }
}
