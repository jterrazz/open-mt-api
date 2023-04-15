import { KoaDeserializer } from '@adapters/koa-deserializer.adapter';

export const getMeKoaDeserializer: KoaDeserializer<number> = () => {
    // return ctx.state.user.id; FIXME
    return 42;
};
