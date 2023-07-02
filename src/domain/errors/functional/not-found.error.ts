export class NotFoundError extends Error {
    public cause?: Error;

    constructor(cause?: Error, internalMessage?: string) {
        super(internalMessage);
        this.cause = cause;
    }
}
