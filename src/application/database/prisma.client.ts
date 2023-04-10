import { PrismaClient } from '@prisma/client';

import { Logger } from '@ports/logger';

export const prismaClientFactory = (databaseUrl: string, logger: Logger) => {
    // Passing database URL to Prisma client
    process.env['DATABASE_URL'] = databaseUrl;

    const prismaClient = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'].map((level) => ({ emit: 'event', level })),
    });

    prismaClient.$on('query', (e: any) =>
        logger.debug(
            `query: ${e.query}, params: ${e.params}, duration: ${e.duration}, target: ${e.target}`,
        ),
    );

    prismaClient.$on('info', (e: any) => logger.info(`message: ${e.message}, target: ${e.target}`));
    prismaClient.$on('warn', (e: any) => logger.warn(`message: ${e.message}, target: ${e.target}`));
    prismaClient.$on('error', (e: any) =>
        logger.error(`message: ${e.message}, target: ${e.target}`),
    );

    return prismaClient;
};
