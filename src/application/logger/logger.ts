import { Logger } from '@ports/logger';

export const loggerFactory: () => Logger = () => ({
    debug(message: string) {
        console.log(message);
    },
    error(message: string) {
        console.error(message);
    },
    info(message: string) {
        console.log(message);
    },
    verbose(message: string) {
        console.log(message);
    },
    warn(message: string) {
        console.log(message);
    },
});
