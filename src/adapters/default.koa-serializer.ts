import { StatusCodes } from 'http-status-codes';

import { KoaSerializer } from '@adapters/koa-serializer.adapter';

export const defaultKoaSerializer: KoaSerializer<undefined> = (ctx) => {
    ctx.status = StatusCodes.OK;
};
