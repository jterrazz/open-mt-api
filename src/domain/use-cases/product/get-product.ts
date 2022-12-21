import { IProductRepository } from '@domain/use-cases/product/product.repository';
import { ProductEntity } from '@domain/use-cases/product/product.entity';

export type GetProduct = (productId: number) => Promise<ProductEntity | null>;

export const getProductFactory = (
    productRepository: IProductRepository,
): GetProduct => {
    return (productId) => {
        return productRepository.findByProductId(productId);
    };
};
