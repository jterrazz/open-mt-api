import { Prisma, PrismaClient } from '@prisma/client';

export const prismaClientFactory = (
    databaseUrl: string,
    prismaLogger: (level: Prisma.LogLevel, message: string) => void,
): PrismaClient => {
    // Passing database URL to Prisma client
    process.env['DATABASE_URL'] = databaseUrl;

    const prismaClient = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'].map((level) => ({
            emit: 'event',
            level: level as Prisma.LogLevel,
        })),
    });

    prismaClient.$on('query', (e) => {
        prismaLogger('query', e.query);
    });

    prismaClient.$on('info', (e) => {
        prismaLogger('info', e.message);
    });

    prismaClient.$on('warn', (e) => {
        prismaLogger('warn', e.message);
    });

    prismaClient.$on('error', (e) => {
        prismaLogger('error', e.message);
    });

    return prismaClient;
};
