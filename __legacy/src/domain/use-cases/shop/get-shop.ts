import { ShopEntity } from './shop.entity';
import { IShopRepository } from './shop.repository';

export type GetShop = (
    shopHandle: string,
) => Promise<Pick<ShopEntity, 'description' | 'handle' | 'name'> | null>;

export const getShopFactory = (shopRepository: IShopRepository): GetShop => {
    return async (shopHandle) => {
        const shop = await shopRepository.findByHandle(shopHandle);

        return (
            shop && {
                description: shop.description,
                handle: shop.handle,
                name: shop.name,
            }
        );
    };
};
