import * as z from 'zod';

// TODO Check how to not interfere with database if param is updated here
export const Z_SHOP_NAME = z.string().min(3).max(80);
export const Z_SHOP_HANDLE = z.string().min(3).max(40);
export const Z_SHOP_CREATION_DATE = z.date();
export const Z_SHOP_DESCRIPTION = z.string();
export const Z_SHOP_BANNER_IMAGE_URL = z.string();
export const Z_SHOP_NUMBER_OF_FOLLOWERS = z.number();

const shopEntitySchema = z.object({
    bannerImageUrl: Z_SHOP_BANNER_IMAGE_URL.optional(),
    creationDate: Z_SHOP_CREATION_DATE,
    description: Z_SHOP_DESCRIPTION.optional(),
    handle: Z_SHOP_HANDLE,
    name: Z_SHOP_NAME,
    numberOfFollowers: Z_SHOP_NUMBER_OF_FOLLOWERS,
});

export type IShopEntity = z.infer<typeof shopEntitySchema>;
