import { IShopRepository } from '@domain/shop/shop-repository';
import { NotFoundError } from '@domain/error/functional/not-found-error';

export type GetShopResult = {
    handle: string;
    description: string | null;
    name: string;
};

export const getShopFactory = (shopRepository: IShopRepository) => {
    return async (shopHandle: string): Promise<GetShopResult> => {
        const shop = await shopRepository.findByHandle(shopHandle);

        if (!shop) {
            throw new NotFoundError(`shop '${shopHandle}' does not exist`);
        }

        return {
            description: shop.description,
            handle: shop.handle,
            name: shop.name,
        };
    };
};
