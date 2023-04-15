import { User } from '@domain/user/user';

export interface UserRepository {
    findUserById(id: number): Promise<User | null>;
}
