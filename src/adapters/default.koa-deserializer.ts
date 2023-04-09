import { KoaDeserializer } from '@adapters/koa-deserializer.adapter';

export const defaultKoaDeserializer: KoaDeserializer<undefined> = () => {
    return undefined;
};
