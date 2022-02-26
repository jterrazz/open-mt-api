import { UserEntity } from './user-entity';

export interface IUserRepository {
    getByHandle(handle: string): Promise<UserEntity | undefined>; // TODO Add the automated types
    getByEmail(email: string): Promise<UserEntity | undefined>; // TODO Add the automated types
    persist(user: UserEntity): Promise<void>; // TODO Add the automated types
}
