import { ProductEntity } from '@domain/use-cases/product/product.entity';

export const serializeProductForPublic = (product: ProductEntity) => {
    return {
        id: product.id,
        name: product.name,
        priceCentsAmount: product.priceCentsAmount,
        priceCurrency: product.priceCurrency,
    };
};
