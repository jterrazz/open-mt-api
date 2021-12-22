import { IConfiguration, IDatabase, ILogger } from '@application/contracts';
import { PrismaClient } from '@prisma/client';

export const prismaDatabaseFactory = (
    { DATABASE: { URL } }: IConfiguration,
    logger: ILogger,
): IDatabase => {
    // Passing database URL to prisma
    process.env['DATABASE_URL'] = URL;

    const prismaClient = new PrismaClient();

    return {
        client: prismaClient,
        connect: async () => {
            logger.info('connecting to database');
            await prismaClient.$connect();
            logger.info('connected to database');
        },
        disconnect: async () => {
            logger.info('disconnecting database');
            await prismaClient.$disconnect();
            logger.info('disconnected database');
        },
    };
};
