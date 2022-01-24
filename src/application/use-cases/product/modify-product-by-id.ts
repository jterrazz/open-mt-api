import { IProductRepository } from '@application/contracts/repositories/ProductRepository';
import { Product } from '@entities/product';
import { merge } from 'lodash';

export const modifyProductById = async (
    productId: string,
    partialProduct: Partial<Product>,
    productRepository: IProductRepository,
): Promise<Product> => {
    const prod = await productRepository.findById(productId);

    const product: Product = {
        id: 'id',
        name: 'name',
        price: {
            amount: 123,
            currency: 'EUR',
        },
    };

    // TODO Disable modification by ID.
    merge(product, partialProduct);

    return productRepository.merge(product);
};
