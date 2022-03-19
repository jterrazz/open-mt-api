import { IInitiatedController } from '@adapters/contracts/controllers';
import { IProductRepository } from '@domain/product/product-repository';
import { modifyProductByIdFactory } from '@application/use-cases/product/modify-product-by-id';

export const productControllerFactory = (
    productRepository: IProductRepository,
) => {
    const modifyProduct: IInitiatedController<any, any, any> = async (ctx) => {
        const modifyProductById = modifyProductByIdFactory(productRepository);
        const modifiedProduct = await modifyProductById(1, 1, {});

        ctx.body = modifiedProduct;
    };

    return { modifyProduct };
};
