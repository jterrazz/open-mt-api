import { User } from '@entities/user';

export interface IUserRepository {
    getByHandle(handle: string): Promise<User | undefined>;
    persist(user: User): Promise<void>;
}
