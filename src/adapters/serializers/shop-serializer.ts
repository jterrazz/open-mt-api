import * as z from 'zod';
import { Deserializer } from '@adapters/contracts/serializers';
import { Z_SHOP_HANDLE, Z_SHOP_NAME } from '@domain/shop/shop-entity';

// CREATE SHOP

export type CreateShopURLParams = {
    test: string;
};
const createShopSchema = z.object({
    handle: Z_SHOP_HANDLE,
    name: Z_SHOP_NAME,
});
export type CreateShopJSONRequest = z.infer<typeof createShopSchema>;
export const deserializeCreateShopRequest: Deserializer<CreateShopJSONRequest> =
    (rawBody) => createShopSchema.parse(rawBody);

export type CreateShopJSONResponse = {
    handle: string;
    name: string;
};

// GET SHOP

// export type GetShopJSONResponse

export type GetShopJSONResponse = {
    handle: string;
    name: string;
};
