import { KoaContext } from '@adapters/koa-deserializer.adapter';

export interface KoaSerializer<T> {
    (ctx: KoaContext, data: T): unknown;
}
