import { IConfiguration, IDatabase, ILogger } from '@application/contracts';
import { PrismaClient } from '@prisma/client';

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
    // Passing database URL to prisma
    process.env['DATABASE_URL'] = URL;

    // TODO TO check logs levels
    const prismaClient = buildDatabaseClient();
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const connect = async (remainingTries = 20) => {
        if (remainingTries <= 0) {
            return;
        }

        try {
            logger.info('connecting to database');
            await prismaClient.$connect();
            logger.info('connected to database');
        } catch (e) {
            await sleep(500);
            logger.error(
                'failed to connect to database, will retry connexion in 500 ms',
            );
            return connect(remainingTries - 1);
        }
    };

    return {
        client: prismaClient,
        connect,
        disconnect: async () => {
            logger.info('disconnecting database');
            await prismaClient.$disconnect();
            logger.info('disconnected database');
        },
    };
};
