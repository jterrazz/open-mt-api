import { PrismaClient } from '@prisma/client';

import { IConfiguration } from '@application/contracts/IConfiguration';
import { IDatabaseService } from '@application/contracts/IDatabaseService';
import { ILogger } from '@application/contracts/ILogger';

export const prismaDatabaseFactory = (
    { DATABASE: { URL } }: IConfiguration,
    logger: ILogger,
): IDatabaseService => {
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
