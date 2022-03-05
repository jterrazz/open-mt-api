import {
    IRepositoryFindByString,
    IRepositoryMerge,
    IRepositoryPersist,
} from '@application/contracts';
import { ProductEntity } from './product-entity';

export interface IProductRepository {
    persist: IRepositoryPersist<ProductEntity>;
    merge: IRepositoryMerge<ProductEntity>;
    findById: IRepositoryFindByString<ProductEntity>;
}
