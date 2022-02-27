import {
    IRepositoryFindByEmail,
    IRepositoryFindByHandle,
    IRepositoryPersist,
} from '@application/contracts';
import { UserEntity } from './user-entity';

export interface IUserRepository {
    findByHandle: IRepositoryFindByHandle<UserEntity>;
    findByEmail: IRepositoryFindByEmail<UserEntity>;
    persist: IRepositoryPersist<UserEntity>;
}
