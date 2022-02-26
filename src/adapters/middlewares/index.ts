import { Middleware } from 'koa';

export interface IMiddlewares {
    authenticateUserMiddleware: Middleware;
    handleRequestErrorsMiddleware: Middleware;
    initRequestTrackerMiddleware: Middleware;
}
