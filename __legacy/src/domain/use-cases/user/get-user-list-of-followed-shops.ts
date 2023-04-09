import { ShopEntity } from '../shop/shop.entity';
import { IShopRepository } from '../shop/shop.repository';

import { UserEntity } from './user.entity';

export type GetUserListOfFollowedShops = (user: UserEntity) => Promise<ShopEntity[]>;

// TODO Paging
export const getUserListOfFollowedShopsFactory = (
    shopRepository: IShopRepository,
): GetUserListOfFollowedShops => {
    return (user: UserEntity) => {
        return shopRepository.findManyByFollowerUserId(user.id);
    };
};
