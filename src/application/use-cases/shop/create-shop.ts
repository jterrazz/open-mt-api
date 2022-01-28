import { IShopEntity } from '@domain/shop/shop-entity';
import { IShopRepository } from '@domain/shop/shop-repository';

type CreateShopParams = {
    name: string;
    handle: string;
    description?: string;
    bannerImageUrl?: string;
};

export const createShopFactory = (shopRepository: IShopRepository) => {
    return async (createShopParams: CreateShopParams): Promise<IShopEntity> => {
        const newShop: IShopEntity = {
            bannerImageUrl: createShopParams.bannerImageUrl,
            creationDate: new Date(),
            description: createShopParams.description,
            handle: createShopParams.handle,
            name: createShopParams.name,
            numberOfFollowers: 42,
        };

        return shopRepository.persist(newShop);
    };
};
