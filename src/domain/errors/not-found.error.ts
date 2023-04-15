export class NotFoundError extends Error {
    constructor(message: string, private readonly exposed = false) {
        super(message);
    }
}
