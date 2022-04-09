import { DuplicatedFieldError } from '@domain/error/technical/duplicated-field-error';
import { IShopEntity } from '@domain/shop/shop-entity';
import { IShopRepository } from '@domain/shop/shop-repository';
import { UnprocessableEntityError } from '@domain/error/client/unprocessable-entity-error';

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
            countFollowers: 0,
            creationDate: new Date(),
            description: createShopParams.description || null,
            handle: createShopParams.handle,
            name: createShopParams.name,
        };

        const persistedShop = await shopRepository
            .persist(newShop)
            .catch((error) => {
                if (
                    error instanceof DuplicatedFieldError &&
                    error.field === 'handle'
                ) {
                    throw new UnprocessableEntityError(['handle']);
                }
                throw error;
            });

        return {
            handle: persistedShop.handle,
            name: persistedShop.name,
        };
    };
};
