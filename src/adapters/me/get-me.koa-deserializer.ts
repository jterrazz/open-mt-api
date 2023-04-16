import { KoaDeserializer } from '@adapters/koa-deserializer.adapter';

export const getMeKoaDeserializer: KoaDeserializer<number> = () => {
    // TODO Test
    // return ctx.state.user.id; FIXME
    return 42;
};
