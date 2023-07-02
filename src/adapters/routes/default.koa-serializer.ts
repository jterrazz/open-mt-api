import { StatusCodes } from 'http-status-codes';

import { KoaSerializer } from '@adapters/routes/koa-serializer.adapter';

export const defaultKoaSerializer: KoaSerializer<void> = (ctx) => {
    ctx.status = StatusCodes.OK;
};
