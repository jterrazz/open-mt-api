import { IShopRepository } from '@domain/shop/shop-repository';

export type GetShopResult = {
    handle: string;
    description: string | undefined;
    name: string;
};

export const getShopFactory = (shopRepository: IShopRepository) => {
    return async (shopHandle: string): Promise<GetShopResult> => {
        const shop = await shopRepository.findByHandle(shopHandle);

        if (!shop) {
            throw new Error('missing shop'); // TODO Replace by HTTP error
        }

        return {
            description: shop.description,
            handle: shop.handle,
            name: shop.name,
        };
    };
};