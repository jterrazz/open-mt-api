import { PrismaClient } from '@prisma/client';

import { prismaClientFactory } from '@application/database/prisma.client';

import { Database } from '@ports/database';
import { Logger } from '@ports/logger';

const prismaDatabaseFactory = (prismaClient: PrismaClient, logger: Logger): Database => {
    return {
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
    };
};

export class PrismaDatabase {
    private static database: Database;
    private static prismaClient: PrismaClient;

    public static getDatabase(databaseUrl: string, logger: Logger): Database {
        if (!PrismaDatabase.database) {
            const prismaClient = this.getPrismaClient(databaseUrl, logger);

            PrismaDatabase.database = prismaDatabaseFactory(prismaClient, logger);
        }

        return PrismaDatabase.database;
    }

    public static getPrismaClient(databaseUrl: string, logger: Logger): PrismaClient {
        if (!PrismaDatabase.prismaClient) {
            PrismaDatabase.prismaClient = prismaClientFactory(databaseUrl, logger);
        }

        return PrismaDatabase.prismaClient;
    }
}
