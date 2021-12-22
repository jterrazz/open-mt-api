import { UserEntity } from './user.entity';

export const createMockUser = (): UserEntity => {
    return {
        biography: 'string',
        firstName: 'string',
        handle: 'string',
        id: 'string',
        lastName: 'string',
    };
};
