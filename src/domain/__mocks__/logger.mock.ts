import { ILogger } from '@domain/logger';

export const createMockOfLogger = (): ILogger => {
    return {
        debug: (log) => console.log(log),
        error: (log) => console.log(log),
        info: (log) => console.log(log),
        verbose: (log) => console.log(log),
        warn: (log) => console.log(log),
    };
};
