import { User } from '@domain/user/user';

import { KoaSerializer } from '@adapters/koa-serializer.adapter';

export const getMeKoaSerializer: KoaSerializer<User> = (ctx, user) => {
    ctx.body = {
        email: user.email,
        id: user.id,
    };
};
