import { User } from '@domain/user/user';

import { KoaSerializer } from '@adapters/koa-serializer.adapter';

export const getMeKoaSerializer: KoaSerializer<User | null> = (ctx, user) => {
    if (!user) {
        ctx.status = 404;
        return;
    }

    ctx.body = {
        email: user.email,
        id: user.id,
    };
};
