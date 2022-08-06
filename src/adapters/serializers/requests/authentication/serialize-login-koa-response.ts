import { IKoaSerializer } from '@adapters/serializers/requests/koa-serializer';

export type SerializeLoginKoaResponse = IKoaSerializer<void>;

export const serializeLoginKoaResponse: SerializeLoginKoaResponse = (ctx) => {
    ctx.status = 200;
};
