import { IShopRepository } from '@domain/shop/shop-repository';
import ShopEntity from '@domain/shop/shop-entity';

type NewShopParams = {
    name: string;
};

export const createNewShopFactory = (shopRepository: IShopRepository) => {
    return async (newShopParams: NewShopParams): Promise<ShopEntity> => {
        const newShop: ShopEntity = {
            adminId: '',
            bannerImageUrl: '',
            description: '',
            name: newShopParams.name,
            numberOfFollowers: 42,
        };

        return shopRepository.persist(newShop);
    };
};
