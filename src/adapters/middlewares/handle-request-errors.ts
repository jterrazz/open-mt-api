import { ClientError } from '@domain/error/client/client-error';
import { ILogger } from '@application/contracts';
import { Middleware } from 'koa';

export const handleRequestErrorsMiddlewareFactory = (
    logger: ILogger,
): Middleware => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (e) {
            if (e instanceof ClientError) {
                ctx.response.status = e.httpCode;
                ctx.response.body = {
                    message: e.message,
                };
            } // TODO else if (e instanceof TechnicalError)
            else {
                logger.error(`unknown error ${e}`);
                throw e;
            }
        }
    };
};
