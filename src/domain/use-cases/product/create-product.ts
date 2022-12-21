import { IProductRepository } from '@domain/use-cases/product/product.repository';
import { ProductEntity } from '@domain/use-cases/product/product.entity';

export type CreateProduct = (
    product: Pick<ProductEntity, 'priceCentsAmount' | 'priceCurrency' | 'name'>,
    shopId: number,
) => Promise<ProductEntity>;

export const createProductFactory = (
    productRepository: IProductRepository,
): CreateProduct => {
    return async (product, shopId) => {
        return productRepository.add(product, shopId);
    };
};
