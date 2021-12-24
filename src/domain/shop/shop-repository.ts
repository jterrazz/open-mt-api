import {
    IRepositoryFindByHandle,
    IRepositoryMerge,
    IRepositoryPersist,
} from '@application/contracts';
import ShopEntity from '@domain/shop/shop-entity';

export interface IShopRepository {
    persist: IRepositoryPersist<ShopEntity>;
    findByHandle: IRepositoryFindByHandle<ShopEntity>;
    merge: IRepositoryMerge<ShopEntity>;
}
