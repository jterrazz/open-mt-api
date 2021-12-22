import { UserEntity } from './user.entity';

export interface IUserRepository {
    getByHandle(handle: string): Promise<UserEntity | undefined>;
    persist(user: UserEntity): Promise<void>;
}
