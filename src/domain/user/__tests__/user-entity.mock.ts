import { UserEntity } from '../user-entity';

export const createMockOfUser = (): UserEntity => ({
    biography: 'string',
    firstName: 'string',
    handle: 'string',
    hashedPassword: 'string',
    id: 'string',
    lastName: 'string',
});
