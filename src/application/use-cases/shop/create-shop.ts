import { IShopEntity } from '@domain/shop/shop-entity';
import { IShopRepository } from '@domain/shop/shop-repository';

type CreateShopParams = {
    name: string;
    handle: string;
    description?: string;
    bannerImageUrl?: string;
};

export type CreateShopResult = {
    handle: string;
    name: string;
};

export const createShopFactory = (shopRepository: IShopRepository) => {
    return async (
        createShopParams: CreateShopParams,
    ): Promise<CreateShopResult> => {
        const newShop: IShopEntity = {
            bannerImageUrl: createShopParams.bannerImageUrl || null,
            creationDate: new Date(),
            description: createShopParams.description || null,
            handle: createShopParams.handle,
            name: createShopParams.name,
            numberOfFollowers: 42,
        };

        const persistedShop = await shopRepository.persist(newShop);

        return {
            handle: persistedShop.handle,
            name: persistedShop.name,
        };
    };
};
