import { StatusCodes } from 'http-status-codes';

import { AuthenticationRequiredClientError } from '@domain/../../../domain/use-cases/error/client/authentication-required-client-error';
import { ForbiddenClientError } from '@domain/../../../domain/use-cases/error/client/forbidden-client-error';
import { CreateProduct } from '@domain/../../../domain/use-cases/product/create-product';
import { IShopRepository } from '@domain/../../../domain/use-cases/shop/shop.repository';

import { serializeProductForPublic } from '@adapters/../../serializers/product/serialize-product-for-public';
import { DeserializeCreateProductKoaRequest } from '@adapters/../../serializers/requests/product/deserialize-create-product-koa-request';
import { SerializeCreateProductKoaResponse } from '@adapters/../../serializers/requests/product/serialize-create-product-koa-response';

import { IInitiatedKoaController } from '../koa-controller';

export const createProductControllerFactory = (
    createProduct: CreateProduct,
    shopRepository: IShopRepository,
    deserializeCreateProductKoaRequest: DeserializeCreateProductKoaRequest,
    serializeCreateProductKoaResponse: SerializeCreateProductKoaResponse,
): IInitiatedKoaController => {
    return async (ctx) => {
        ctx.requestTracker.requestedCreateProduct();

        const { authenticatedUser, productParams } = deserializeCreateProductKoaRequest(ctx);

        if (!authenticatedUser) {
            throw new AuthenticationRequiredClientError();
        }

        const shopEntity = await shopRepository.findByOwnerId(authenticatedUser.id);

        if (!shopEntity) {
            throw new ForbiddenClientError("the authenticated user doesn't have any shop");
        }

        const createdProduct = await createProduct(
            {
                name: productParams.name,
                priceCentsAmount: productParams.priceCentsAmount,
                priceCurrency: productParams.priceCurrency,
            },
            shopEntity.id,
        );

        // TODO Delete serializer, move tests to controller tests
        // serializeCreateProductKoaResponse(ctx, createdProduct);

        ctx.status = StatusCodes.CREATED;
        ctx.body = serializeProductForPublic(createdProduct);
    };
};
