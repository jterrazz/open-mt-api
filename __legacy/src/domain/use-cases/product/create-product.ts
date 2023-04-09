import { ProductEntity } from './product.entity';
import { IProductRepository } from './product.repository';

export type CreateProduct = (
    product: Pick<ProductEntity, 'priceCentsAmount' | 'priceCurrency' | 'name'>,
    shopId: number,
) => Promise<ProductEntity>;

export const createProductFactory = (productRepository: IProductRepository): CreateProduct => {
    return async (product, shopId) => {
        return productRepository.add(product, shopId);
    };
};
