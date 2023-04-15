import { ApiStatusMetadata } from '@domain/api/status';

import { KoaSerializer } from '@adapters/koa-serializer.adapter';

export const apiStatusKoaSerializer: KoaSerializer<ApiStatusMetadata> = (ctx, apiStatus) => {
    ctx.status = 200;
    ctx.body = {
        message: apiStatus.message,
        status: apiStatus.status,
        time: apiStatus.time.toISOString(),
        version: apiStatus.version,
    };
};
