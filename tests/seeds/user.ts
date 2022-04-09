import { IPrismaDatabase } from '@infrastructure/orm/prisma/prisma-database';
import { randomUUID } from 'crypto';
import type { User } from '@prisma/client';

export const seedDatabaseWithUser = async (
    database: IPrismaDatabase['client'],
    partialUser: Partial<User> = {},
) => {
    const { user } = await database.$transaction(
        async (prismaTransactionClient) => {
            console.log('sbeforeettings');
            console.log('sbeforeettings');
            console.log('sbeforeettings');

            const settings = await prismaTransactionClient.userSettings.create({
                data: {
                    language: 'FR',
                },
            });

            console.log('settings');
            console.log('settings');
            console.log('settings');
            console.log(settings);

            const user = await prismaTransactionClient.user.create({
                data: {
                    email: partialUser.email || `${randomUUID()}@mail.com`,
                    firstName: partialUser.firstName || 'the_user_first_name',
                    handle: partialUser.handle || randomUUID(),
                    hashedPassword:
                        partialUser.hashedPassword ||
                        'the_user_hashed_password',
                    lastName: partialUser.lastName || 'the_user_last_name',
                    userSettingsId: settings.id,
                },
            });

            console.log('user');
            console.log('user');
            console.log('user');
            console.log(user);

            return { settings, user };
        },
    );

    return {
        email: user.email,
        handle: user.handle,
        id: user.id,
    };
};
