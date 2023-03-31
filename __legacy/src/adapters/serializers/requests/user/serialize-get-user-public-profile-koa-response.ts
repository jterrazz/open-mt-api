import { UserEntity } from '@domain/../../../../domain/use-cases/user/user.entity';

import { IKoaSerializer } from '../koa-serializer';

export type SerializeGetUserKoaResponse = IKoaSerializer<UserEntity>;

export const serializeGetUserPublicProfileKoaResponse: SerializeGetUserKoaResponse = (
    ctx,
    user,
) => {
    ctx.body = {
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
    };
};
