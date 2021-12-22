import { IShopRepository } from '@domain/shop/shop.repository';
import ShopEntity from '@domain/shop/shop.entity';

export const createNewShopFactory = (shopRepository: IShopRepository) => {
    return async (shopToAdd: ShopEntity): Promise<ShopEntity> => {
        return shopRepository.persist(shopToAdd);
    };
};
