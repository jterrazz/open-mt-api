import { IPrismaDatabase } from '@infrastructure/orm/prisma/prisma-database';
import { randomUUID } from 'crypto';
import type { User } from '@prisma/client';

export const seedDatabaseWithUser = async (
    database: IPrismaDatabase['client'],
    partialUser: Partial<User> = {},
) => {
    const newUser: User = {
        email: `${randomUUID()}@mail.com`,
        firstName: 'the_user_first_name',
        handle: randomUUID(),
        hashedPassword: 'the_user_hashed_password',
        // @ts-ignore
        id: undefined,
        lastName: 'the_user_last_name',
        ...partialUser,
    };

    return database.user.create({
        data: newUser,
    });
};
