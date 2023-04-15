import { User } from '@domain/user/user';

export interface GetUserController {
    (id: number): Promise<User | null>;
}
