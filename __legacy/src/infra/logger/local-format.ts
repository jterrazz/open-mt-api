import winston from 'winston';

enum LoggerColors {
    error = '\x1b[31m',
    warn = '\x1b[35m',
    info = '\x1b[34m',
    verbose = '\x1b[37m',
    debug = '\x1b[37m',
}

export const winstonLocalFormat = winston.format.printf((info) => {
    return LoggerColors[info.level] + `[${info.category}] ${info.message} \x1b[0m`;
});
