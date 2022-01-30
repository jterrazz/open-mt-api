import { IConfiguration, IDatabase, ILogger } from '@application/contracts';
import { PrismaClient } from '@prisma/client';

export const prismaDatabaseFactory = (
    { DATABASE: { URL } }: IConfiguration,
    logger: ILogger,
): IDatabase => {
    // Passing database URL to prisma
    process.env['DATABASE_URL'] = URL;

    // TODO TO check logs levels
    const prismaClient = new PrismaClient({
        log: [
            {
                emit: 'stdout',
                level: 'query',
            },
            {
                emit: 'stdout',
                level: 'error',
            },
            {
                emit: 'stdout',
                level: 'info',
            },
            {
                emit: 'stdout',
                level: 'warn',
            },
        ],
    });

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
