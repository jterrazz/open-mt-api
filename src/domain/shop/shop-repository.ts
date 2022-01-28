import {
    IRepositoryFindByHandle,
    IRepositoryMerge,
    IRepositoryPersist,
} from '@application/contracts';
import { IShopEntity } from '@domain/shop/shop-entity';

export interface IShopRepository {
    persist: IRepositoryPersist<IShopEntity>;
    findByHandle: IRepositoryFindByHandle<IShopEntity>;
    merge: IRepositoryMerge<IShopEntity>;
}
