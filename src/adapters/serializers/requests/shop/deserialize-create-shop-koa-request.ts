import * as z from 'zod';
import { IKoaDeserializer } from '@adapters/serializers/requests/koa-serializer';
import { Z_SHOP_HANDLE, Z_SHOP_NAME } from '@domain/use-cases/shop/shop.entity';
import { zodErrorToUnprocessableEntityErrorWrapper } from '@application/../../../../domain/utils/zod/zod-error-to-unprocessable-entity-error-wrapper';

export type DeserializeCreateShopKoaRequest = IKoaDeserializer<{
    handle: string;
    name: string;
}>;

export const deserializeCreateShopKoaRequest: DeserializeCreateShopKoaRequest =
    (ctx) => {
        return zodErrorToUnprocessableEntityErrorWrapper(() =>
            z
                .object({
                    handle: Z_SHOP_HANDLE,
                    name: Z_SHOP_NAME,
                })
                .parse(ctx.request.body),
        );
    };
