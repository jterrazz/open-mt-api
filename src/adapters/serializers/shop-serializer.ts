import * as z from 'zod';
import { Deserializer } from '@adapters/serializers/serializer';
import { Z_SHOP_HANDLE, Z_SHOP_NAME } from '@domain/shop/shop-entity';

// Create shop request

const createShopSchema = z.object({
    handle: Z_SHOP_HANDLE,
    name: Z_SHOP_NAME,
});
export type ICreateShopRequest = z.infer<typeof createShopSchema>;
export const deserializeCreateShopRequest: Deserializer<ICreateShopRequest> = (
    rawBody,
) => createShopSchema.parse(rawBody);

// Create shop response

export type ICreateShopResponse = {
    handle: string;
    name: string;
};
