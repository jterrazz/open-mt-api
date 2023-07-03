import Router from 'koa-router';

export interface KoaSerializer<T> {
    (ctx: Router.RouterContext, data: T): unknown;
}
