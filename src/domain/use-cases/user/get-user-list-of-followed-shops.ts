import { IShopRepository } from '@domain/use-cases/shop/shop.repository';
import { ShopEntity } from '@domain/use-cases/shop/shop.entity';
import { UserEntity } from '@domain/use-cases/user/user.entity';

export type GetUserListOfFollowedShops = (
    user: UserEntity,
) => Promise<ShopEntity[]>;

// TODO Paging
export const getUserListOfFollowedShopsFactory = (
    shopRepository: IShopRepository,
): GetUserListOfFollowedShops => {
    return (user: UserEntity) => {
        return shopRepository.findManyByFollowerUserId(user.id);
    };
};
