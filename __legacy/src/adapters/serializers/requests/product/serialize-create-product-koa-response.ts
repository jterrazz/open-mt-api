import { StatusCodes } from 'http-status-codes';

import { ProductEntity } from '@domain/../../../../domain/use-cases/product/product.entity';

import { IKoaSerializer } from '../koa-serializer';

export type SerializeCreateProductKoaResponse = IKoaSerializer<ProductEntity>;

export const serializeCreateProductKoaResponse: SerializeCreateProductKoaResponse = (
    ctx,
    product,
) => {
    ctx.status = StatusCodes.CREATED;
    ctx.body = {
        id: product.id,
        name: product.name,
        priceCentsAmount: product.priceCentsAmount,
        priceCurrency: product.priceCurrency,
    };
};
