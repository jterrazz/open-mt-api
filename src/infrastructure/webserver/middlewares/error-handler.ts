import { FunctionalError } from '@domain/error/functional/functional-error';
import { Middleware } from 'koa';

export const errorHandlerMiddleware: Middleware = async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        if (e instanceof FunctionalError) {
            ctx.response.status = e.httpCode;
            ctx.response.body = {
                message: e.message,
            };
        } // TODO else if (e instanceof TechnicalError)
        else {
            throw e;
        }
    }
};
