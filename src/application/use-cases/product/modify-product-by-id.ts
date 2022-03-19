import { Currency } from '@domain/currency/currency';
import { IProductRepository } from '@domain/product/product-repository';
import { NotFoundError } from '@domain/error/client/not-found-error';
import { ProductEntity } from '@domain/product/product-entity';

type ModifyProductParams = {
    name?: string;
    priceCentsAmount?: number;
    priceCurrency?: Currency;
};

export const modifyProductByIdFactory = (
    productRepository: IProductRepository,
) => {
    return async (
        userAsking: 1,
        productId: number,
        modifyProductParams: ModifyProductParams,
    ): Promise<ProductEntity> => {
        const productEntity = await productRepository.findById(productId);

        // TODO Only if user is the owner

        if (!productEntity) {
            throw new NotFoundError('unknown product');
        }

        if (modifyProductParams.name) {
            productEntity.name = modifyProductParams.name;
        }

        // TODO Test no modification by ID.

        return productRepository.merge(productEntity);
    };
};
