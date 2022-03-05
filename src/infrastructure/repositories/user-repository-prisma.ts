import { IUserRepository } from '@domain/user/user-repository';
import { PrismaClient, User } from '@prisma/client';
import { UserEntity } from '@domain/user/user-entity';

const mapPersistedUserToUser = (persistedUser: User): UserEntity => ({
    email: persistedUser.email,
    firstName: persistedUser.firstName,
    handle: persistedUser.handle,
    hashedPassword: persistedUser.hashedPassword,
    id: persistedUser.id,
    lastName: persistedUser.lastName,
});

export const userRepositoryPrismaFactory = (
    prismaClient: PrismaClient,
): IUserRepository => ({
    async findByEmail(email) {
        const persistedUser = await prismaClient.user.findFirst({
            where: { email },
        });

        return persistedUser && mapPersistedUserToUser(persistedUser);
    },
    async findByHandle(handle) {
        const persistedUser = await prismaClient.user.findFirst({
            where: { handle },
        });

        return persistedUser && mapPersistedUserToUser(persistedUser);
    },
    async persist(user) {
        const { persistedUser } = await prismaClient.$transaction(
            async (prismaTransactionClient) => {
                const persistedSettings =
                    await prismaTransactionClient.userSettings.create({
                        data: {
                            language: 'FR',
                        },
                    });

                const persistedUser = await prismaTransactionClient.user.create(
                    {
                        data: {
                            email: user.email,
                            firstName: user.firstName,
                            handle: user.handle,
                            hashedPassword: user.hashedPassword,
                            lastName: user.lastName,
                            userSettingsId: persistedSettings.id,
                        },
                    },
                );

                return { persistedUser };
            },
        );

        return persistedUser && mapPersistedUserToUser(persistedUser);
    },
});
