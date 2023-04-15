import { User } from '@domain/user/user';

export interface GetMeController {
    (id: number): Promise<User>;
}
