import { KoaMiddleware } from '@adapters/koa-middleware.adapter';

import { getApiInformation } from '@infrastructure/api/information';

export const apiVersionKoaMiddleware: KoaMiddleware = async (ctx, next) => {
    const apiInformation = await getApiInformation();

    ctx.set('api-version', apiInformation.version);
    await next();
};
