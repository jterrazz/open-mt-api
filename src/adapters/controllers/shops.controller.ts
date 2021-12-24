import { IControllers, IKoaContext } from '@adapters';
import { IProjectDependencies } from '@application/contracts';
import { createNewShopFactory } from '@application/use-cases/shops/create-new-shop';
import ShopEntity from '@domain/shop/shop-entity';

interface INewShopRequest {
    handle: string;
    name: string;
    description: string;
}

interface INewShopResponse {
    handle: string;
    name: string;
    id: number;
    description: string;
}

export const shopsControllerFactory = (
    dependencies: IProjectDependencies,
): IControllers['shops'] => {
    const createNewShop = async (
        ctx: IKoaContext<INewShopRequest, INewShopResponse>,
    ) => {
        const createNewShop = createNewShopFactory(
            dependencies.repositories.shopRepository,
        );

        const newShop = new ShopEntity(); // TODO Replace by deserializer

        const savedShop = await createNewShop(newShop); // TODO Replace by serializer

        ctx.body = {
            description: '',
            handle: '',
            id: 0,
            name: savedShop.name,
        };
    };

    return { createNewShop };
};
