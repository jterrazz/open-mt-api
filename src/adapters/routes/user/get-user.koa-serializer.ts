import { StatusCodes } from 'http-status-codes';

import { User } from '@domain/models/user/user';

import { KoaSerializer } from '@adapters/routes/koa-serializer.adapter';

export const getUserKoaSerializer: KoaSerializer<User> = (ctx, user) => {
    ctx.status = StatusCodes.OK;
    ctx.body = {
        email: user.email,
        id: user.id,
    };
};
