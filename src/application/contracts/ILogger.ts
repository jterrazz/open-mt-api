export interface ILogger {
    error: (message: unknown) => void;
    warn: (message: unknown) => void;
    info: (message: unknown) => void;
    verbose: (message: unknown) => void;
    debug: (message: unknown) => void;
}

export enum LoggerLevels {
    error = 'error',
    warn = 'warn',
    info = 'info',
    verbose = 'verbose',
    debug = 'debug',
}
