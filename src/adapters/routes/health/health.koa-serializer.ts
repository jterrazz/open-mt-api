import { StatusCodes } from 'http-status-codes';

import { HealthMetadata } from '@domain/models/health/health-metadata';

import { KoaSerializer } from '@adapters/routes/koa-serializer.adapter';

export const healthKoaSerializer: KoaSerializer<HealthMetadata> = (ctx, apiStatus) => {
    ctx.status = StatusCodes.OK;
    ctx.body = {
        message: apiStatus.message,
        status: apiStatus.status,
        time: apiStatus.time.toISOString(),
        version: apiStatus.version,
    };
};
