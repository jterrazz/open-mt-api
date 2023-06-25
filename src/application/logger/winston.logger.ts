import winston from 'winston';

import { Environment } from '@application/environment';

import { Logger } from '@ports/logger';

import { LoggerLevel } from './logger.level';

export const winstonLoggerFactory = (environment: Environment, level: LoggerLevel): Logger => {
    const readableEnvironment =
        environment === Environment.Development || environment === Environment.Test;

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
        format: readableEnvironment ? coloredFormat : jsonFormat,
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
