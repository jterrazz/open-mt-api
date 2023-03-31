import { ProductEntity } from '@domain/../../../../domain/use-cases/product/product.entity';

import { IKoaSerializer } from '../koa-serializer';

export type SerializeModifyProductKoaResponse = IKoaSerializer<ProductEntity>;

export const serializeModifyProductKoaResponse: SerializeModifyProductKoaResponse = (
    ctx,
    modifiedProduct,
) => {
    ctx.body = {
        id: modifiedProduct.id,
        name: modifiedProduct.name,
        priceCentsAmount: modifiedProduct.priceCentsAmount,
        priceCurrency: modifiedProduct.priceCurrency,
    };
};
