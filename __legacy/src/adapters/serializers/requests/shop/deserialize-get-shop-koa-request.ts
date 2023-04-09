import * as z from 'zod';

import { zodErrorToUnprocessableEntityErrorWrapper } from '@application/../../../../domain/utils/zod/zod-error-to-unprocessable-entity-error-wrapper';

import { Z_SHOP_HANDLE } from '@domain/../../../../domain/use-cases/shop/shop.entity';

import { IKoaDeserializer } from '../koa-serializer';

export type DeserializeGetShopKoaRequest = IKoaDeserializer<{
    shopHandle: string;
}>;

export const deserializeGetShopKoaRequest: DeserializeGetShopKoaRequest = (ctx) => {
    return zodErrorToUnprocessableEntityErrorWrapper(() =>
        z
            .object({
                shopHandle: Z_SHOP_HANDLE,
            })
            .parse(ctx.params),
    );
};
