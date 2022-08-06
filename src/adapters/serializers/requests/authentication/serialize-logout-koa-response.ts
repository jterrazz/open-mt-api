import { IKoaSerializer } from '@adapters/serializers/requests/koa-serializer';

export type SerializeLogoutKoaResponse = IKoaSerializer<void>;

export const serializeLogoutKoaResponse: SerializeLogoutKoaResponse = (ctx) => {
    ctx.session = null;
    ctx.status = 200;
};
