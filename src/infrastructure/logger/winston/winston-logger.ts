import winston from 'winston';

import { IConfiguration, ILogger } from '@application/contracts';
import { getCallerFile } from '@application/utils/node';
import { winstonLocalFormat } from '@infrastructure/logger/winston/local-format';

export const winstonLoggerFactory = (configuration: IConfiguration): ILogger => {
    const winstonLogger = winston.createLogger({
        level: configuration.LOG.LEVEL,
    });

    winstonLogger.add(
        new winston.transports.Console({
            format:
                configuration.ENVIRONMENT === 'development'
                    ? winstonLocalFormat
                    : winston.format.json(),
        }),
    );

    const _buildMessage = (message: unknown) => {
        return {
            category: getCallerFile(),
            message: message,
        };
    };

    return {
        debug: (message: unknown): void => {
            winstonLogger.debug(_buildMessage(message));
        },
        error: (message: unknown): void => {
            winstonLogger.error(_buildMessage(message));
        },
        info: (message: unknown): void => {
            winstonLogger.info(_buildMessage(message));
        },
        verbose: (message: unknown): void => {
            winstonLogger.verbose(_buildMessage(message));
        },
        warn: (message: unknown): void => {
            winstonLogger.warn(_buildMessage(message));
        },
    };
};
