import { ProductEntity } from './product.entity';
import { IProductRepository } from './product.repository';

export type GetProduct = (productId: number) => Promise<ProductEntity | null>;

export const getProductFactory = (productRepository: IProductRepository): GetProduct => {
    return (productId) => {
        return productRepository.findByProductId(productId);
    };
};
