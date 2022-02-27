import { IConfiguration, IDatabase, ILogger } from '@application/contracts';
import { PrismaClient } from '@prisma/client';
import { sleep } from '@application/utils/async';

export interface IPrismaDatabase extends IDatabase {
    client: PrismaClient;
}

const buildDatabaseClient = () => {
    return new PrismaClient({
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
};

export const prismaDatabaseFactory = (
    { DATABASE: { URL } }: IConfiguration,
    logger: ILogger,
): IPrismaDatabase => {
    // Recreating this object would result in failure due to multiple Prisma clients
    // The global variable keeps one object for all unit tests
    if (global.prismaDatabase) {
        return global.prismaDatabase;
    }

    // Passing database URL to prisma
    process.env['DATABASE_URL'] = URL;

    const prismaClient = buildDatabaseClient();
    const connect = async (remainingTries = 20) => {
        if (remainingTries <= 0) {
            return;
        }

        try {
            logger.info('connecting to database');
            await prismaClient.$connect();
            logger.debug('connected to database');
        } catch (e) {
            logger.error(
                'failed to connect to database, will try again in 500 ms',
            );
            await sleep(500);
            return connect(remainingTries - 1);
        }
    };

    global.prismaDatabase = {
        client: prismaClient,
        connect,
        disconnect: async () => {
            logger.info('disconnecting database');
            await prismaClient.$disconnect();
            logger.debug('disconnected database');
        },
    };

    return global.prismaDatabase;
};
