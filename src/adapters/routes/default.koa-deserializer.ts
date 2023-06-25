import { KoaDeserializer } from '@adapters/routes/koa-deserializer.adapter';

export const defaultKoaDeserializer: KoaDeserializer<undefined> = () => {
    return undefined;
};
