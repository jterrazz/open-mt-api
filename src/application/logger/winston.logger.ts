import winston from 'winston';

import { Logger, LoggerLevel } from '@ports/logger';

export const loggerFactory = (environment: string, level: LoggerLevel): Logger => {
    const devEnvironment = environment === 'development';

    // JSON format for the default case
    const jsonFormat = winston.format.combine(winston.format.timestamp(), winston.format.json());

    // Colored text format for the development environment
    const coloredFormat = winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        }),
    );

    const logger = winston.createLogger({
        format: devEnvironment ? coloredFormat : jsonFormat,
        level,
        transports: [new winston.transports.Console()],
    });

    return {
        debug: (message: unknown): void => {
            logger.debug(message);
        },
        error: (message: unknown): void => {
            logger.error(message);
        },
        info: (message: unknown): void => {
            logger.info(message);
        },
        warn: (message: unknown): void => {
            logger.warn(message);
        },
    };
};
