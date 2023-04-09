import type { User } from '@prisma/client';
import { randomUUID } from 'crypto';

import { IPrismaDatabase } from '@infrastructure/../../src/infra/orm/database/database-database';

export const seedDatabaseWithUser = async (
    database: IPrismaDatabase['client'],
    partialUser: Partial<User> = {},
) => {
    return await database.user.create({
        data: {
            email: partialUser.email || `${randomUUID()}@mail.com`,
            firstName: partialUser.firstName || 'the_user_first_name',
            hashedPassword: partialUser.hashedPassword || 'the_user_hashed_password',
            language: 'FR', // TODO test with other languages
            lastName: partialUser.lastName || 'the_user_last_name',
        },
    });
};

export const seedExampleOfValidPassword = {
    hashedPassword: '$2b$10$oY3.OuDt.EMUz/5tN60FROv9cphD56SEU458XokZZGhmgP8FZP8eG',
    password: 'valid_password',
};
