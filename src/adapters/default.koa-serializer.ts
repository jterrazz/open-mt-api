import { StatusCodes } from 'http-status-codes';

import { KoaSerializer } from '@adapters/koa-serializer.adapter';

export const defaultKoaSerializer: KoaSerializer<void> = (ctx) => {
    ctx.status = StatusCodes.OK;
};
