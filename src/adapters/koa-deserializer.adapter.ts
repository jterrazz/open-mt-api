import { Context } from 'koa';

export type KoaContext = Context;

export interface KoaDeserializer<T> {
    (ctx: KoaContext): T;
}
