import { IProjectDependencies, ITracker } from '@application/contracts';
import { ProductEntity } from '@domain/product/product.entity';

export const createNewProductFactory = (
    dependencies: IProjectDependencies,
    tracker: ITracker,
) => {
    return async (product: ProductEntity) => {
        const {
            repositories: { productRepository },
        } = dependencies;

        tracker.events.requested.createNewProduct();

        return productRepository.persist(product);
    };
};
