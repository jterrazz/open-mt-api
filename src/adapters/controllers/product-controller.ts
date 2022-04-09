import { IInitiatedKoaController } from '@adapters/contracts/controllers';
import { IProductRepository } from '@domain/product/product-repository';
import { modifyProductByIdFactory } from '@application/use-cases/product/modify-product-by-id';

export const productControllerFactory = (
    productRepository: IProductRepository,
) => {
    const modifyProduct: IInitiatedKoaController = async (ctx) => {
        // TODO Serialize
        const modifyProductById = modifyProductByIdFactory(productRepository);
        const modifiedProduct = await modifyProductById(1, 1, {});

        // TODO Serialize
        ctx.body = modifiedProduct;
    };

    return { modifyProduct };
};
