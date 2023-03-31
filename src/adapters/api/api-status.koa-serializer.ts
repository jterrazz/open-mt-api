import { ApiInformation } from '@domain/api/information';

import { KoaSerializer } from '@adapters/koa-serializer.adapter';

export const apiStatusKoaSerializer: KoaSerializer<ApiInformation> = (ctx, apiStatus) => {
    ctx.status = 200;
    ctx.body = {
        message: apiStatus.message,
        status: apiStatus.status,
        time: apiStatus.time.toISOString(),
        version: apiStatus.version,
    };
};
