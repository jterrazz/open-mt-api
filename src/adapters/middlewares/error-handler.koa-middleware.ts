import { StatusCodes } from 'http-status-codes';
import Router from 'koa-router';

import { ExposedError } from '@domain/errors/exposed.error';

import { Logger } from '@ports/logger';

const DEFAULT_ERROR_MESSAGE = 'Internal server error';
const DEFAULT_ERROR_STATUS = StatusCodes.INTERNAL_SERVER_ERROR;

const ErrorToResponseMap: Array<[string, StatusCodes, string]> = [
    ['NotFoundError', StatusCodes.NOT_FOUND, 'Not found'],
    ['UnprocessableEntityError', StatusCodes.UNPROCESSABLE_ENTITY, 'Unprocessable entity'],
    ['InternalServerError', DEFAULT_ERROR_STATUS, DEFAULT_ERROR_MESSAGE],
];

const mapExposedErrorToResponse = (
    exposedError: ExposedError,
): {
    status: StatusCodes;
    message: string;
} => {
    for (const [errorName, status, message] of ErrorToResponseMap) {
        if (exposedError.cause.constructor.name === errorName) {
            return {
                message: exposedError.publicMessage ?? message,
                status,
            };
        }
    }

    return {
        message: exposedError.publicMessage ?? DEFAULT_ERROR_MESSAGE,
        status: DEFAULT_ERROR_STATUS,
    };
};

export const errorHandlerKoaMiddlewareFactory = (logger: Logger): Router.IMiddleware => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            logger.debug('error handler middleware caught an error');

            if (err instanceof ExposedError) {
                const { status, message } = mapExposedErrorToResponse(err);

                ctx.status = status;
                ctx.body = {
                    message,
                };

                return;
            }

            logger.error(err);

            ctx.status = DEFAULT_ERROR_STATUS;
            ctx.body = {
                message: DEFAULT_ERROR_MESSAGE,
            };
        }
    };
};
