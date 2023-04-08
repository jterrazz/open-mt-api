import { NotFoundClientError } from '@domain/../../../domain/use-cases/error/client/not-found-client-error';
import { IProductRepository } from '@domain/../../../domain/use-cases/product/product.repository';

import { serializeProductForPublic } from '@adapters/../../serializers/product/serialize-product-for-public';

import { IInitiatedKoaContext, IInitiatedKoaController } from '../koa-controller';

export const deserializeGetProductKoaRequest = (ctx: IInitiatedKoaContext): number => {
    const productId = Number(ctx.params.productId);

    if (isNaN(productId)) {
        throw new NotFoundClientError('Product not found');
    }

    return productId;
};

// TODO Stop doing not useful use cases like simple GETs and just pass the repository directly in a controller

export const getProductControllerFactory = (
    productRepository: IProductRepository,
): IInitiatedKoaController => {
    return async (ctx) => {
        ctx.requestTracker.requestedGetProduct();

        const productId = deserializeGetProductKoaRequest(ctx);
        const product = await productRepository.findByProductId(productId);

        if (!product) {
            throw new NotFoundClientError('Product not found');
        }

        ctx.status = 200;
        ctx.body = serializeProductForPublic(product);
    };
};