import { KoaContext } from '@adapters/routes/koa-deserializer.adapter';

export interface KoaSerializer<T> {
    (ctx: KoaContext, data: T): unknown;
}
