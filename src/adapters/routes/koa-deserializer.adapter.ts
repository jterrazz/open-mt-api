import { Context } from 'koa';

import { GetTypeSafeInputsFromKoa } from '@adapters/routes/get-type-safe-inputs-from.koa';

export type KoaContext = Context;

export interface KoaDeserializer<T> {
    (getTypeSafeInputsFromRequest: GetTypeSafeInputsFromKoa): T;
}
