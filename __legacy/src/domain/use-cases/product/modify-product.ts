import { ForbiddenClientError } from '../error/client/forbidden-client-error';
import { NotFoundClientError } from '../error/client/not-found-client-error';
import { IShopRepository } from '../shop/shop.repository';
import { UserEntity } from '../user/user.entity';

import { ProductEntity } from './product.entity';
import { IProductRepository } from './product.repository';

export type ModifyProduct = (
    authenticatedUser: UserEntity,
    productId: number,
    modifyProductParams: Partial<
        Pick<ProductEntity, 'name' | 'priceCurrency' | 'priceCentsAmount'>
    >,
) => Promise<ProductEntity>;

export const modifyProductFactory = (
    productRepository: IProductRepository,
    shopRepository: IShopRepository,
): ModifyProduct => {
    return async (authenticatedUser, productId, modifyProductParams) => {
        const [userShop, productEntity] = await Promise.all([
            shopRepository.findByOwnerId(authenticatedUser.id),
            productRepository.findByProductId(productId),
        ]);

        if (!productEntity) {
            throw new NotFoundClientError('unknown product');
        }

        if (productEntity.shopId !== userShop?.id) {
            throw new ForbiddenClientError();
        }

        if (modifyProductParams.name !== undefined) productEntity.name = modifyProductParams.name;
        if (modifyProductParams.priceCurrency !== undefined)
            productEntity.priceCurrency = modifyProductParams.priceCurrency;
        if (modifyProductParams.priceCentsAmount !== undefined)
            productEntity.priceCentsAmount = modifyProductParams.priceCentsAmount;

        return productRepository.update(productEntity.id, productEntity);
    };
};
