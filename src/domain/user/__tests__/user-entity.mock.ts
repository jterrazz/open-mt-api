import { UserEntity } from '../user-entity';

export const createMockOfUser = (): UserEntity => ({
    email: 'string',
    firstName: 'string',
    handle: 'string',
    hashedPassword: 'string',
    id: 42,
    lastName: 'string',
});
