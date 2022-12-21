import { IKoaSerializer } from '@adapters/serializers/requests/koa-serializer';
import { ProductEntity } from '@domain/use-cases/product/product.entity';
import { StatusCodes } from 'http-status-codes';

export type SerializeCreateProductKoaResponse = IKoaSerializer<ProductEntity>;

export const serializeCreateProductKoaResponse: SerializeCreateProductKoaResponse =
    (ctx, product) => {
        ctx.status = StatusCodes.CREATED;
        ctx.body = {
            id: product.id,
            name: product.name,
            priceCentsAmount: product.priceCentsAmount,
            priceCurrency: product.priceCurrency,
        };
    };
