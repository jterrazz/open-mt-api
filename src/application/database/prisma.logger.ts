import { Prisma } from '@prisma/client';

import { Logger } from '@ports/logger';

export type PrismaLogger = (level: Prisma.LogLevel, message: string) => void;

export const prismaLoggerFactory = (logger: Logger): PrismaLogger => {
    return (level: Prisma.LogLevel, message: string) => {
        if (level === 'query') {
            logger.debug(message);
        } else if (level === 'info') {
            logger.info(message);
        } else if (level === 'warn') {
            logger.warn(message);
        } else if (level === 'error') {
            logger.error(message);
        }
    };
};
