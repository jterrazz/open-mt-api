import { StatusCodes } from 'http-status-codes';
import * as util from 'util';

import { ClientError } from './client-error';

export class UnprocessableEntityClientError extends ClientError {
    constructor(fields: string[], publicMessage?: string) {
        publicMessage ||= `bad fields ${util.inspect(fields)}`;

        super(StatusCodes.UNPROCESSABLE_ENTITY, publicMessage, {
            fields,
        });
    }
}
