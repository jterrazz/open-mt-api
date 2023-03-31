import { PrismaClient } from '@prisma/client';

import { Database } from '@ports/database';
import { Logger } from '@ports/logger';

export interface PrismaDatabase extends Database {
    prisma: PrismaClient;
}

const buildDatabaseClient = (databaseUrl: string, logger: Logger) => {
    // Passing database URL to Prisma client
    process.env['DATABASE_URL'] = databaseUrl;

    const prismaClient = new PrismaClient({
        log: [
            {
                emit: 'event',
                level: 'query',
            },
            {
                emit: 'event',
                level: 'error',
            },
            {
                emit: 'event',
                level: 'info',
            },
            {
                emit: 'event',
                level: 'warn',
            },
        ],
    });

    prismaClient.$on('query', (e) => {
        logger.debug(
            `query: ${e.query}, params: ${e.params}, duration: ${e.duration}, target: ${e.target}`,
        );
    });

    prismaClient.$on('info', (e) => {
        logger.info(`message: ${e.message}, target: ${e.target}`);
    });

    prismaClient.$on('warn', (e) => {
        logger.warn(`message: ${e.message}, target: ${e.target}`);
    });

    prismaClient.$on('error', (e) => {
        logger.error(`message: ${e.message}, target: ${e.target}`);
    });

    return prismaClient;
};

export const prismaDatabaseFactory = (databaseUrl: string, logger: Logger): PrismaDatabase => {
    // Recreating this object would result in failure due to multiple Prisma clients
    // This variable must never be reassigned in an execution
    if (global.prismaDatabase) {
        return global.prismaDatabase;
    }

    const prismaClient = buildDatabaseClient(databaseUrl, logger);

    global.prismaDatabase = {
        connect: async () => {
            logger.info('connecting to database');
            await prismaClient.$connect();
            logger.info('connected to database');
        },
        disconnect: async () => {
            logger.info('disconnecting database');
            await prismaClient.$disconnect();
            logger.debug('disconnected database');
        },
        prisma: prismaClient,
    };

    return global.prismaDatabase;
};
