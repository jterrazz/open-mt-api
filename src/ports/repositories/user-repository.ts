import { User } from '@domain/user/user';

export interface UserRepository {
    findUserById(id: string): Promise<User | null>;
}
