import { UnprocessableEntityError } from '@domain/error/client/unprocessable-entity-error';
import { ZodError } from 'zod';

export const mapZodErrorToUnprocessableEntityError = (callback) => {
    try {
        return callback();
    } catch (error) {
        if (error instanceof ZodError) {
            console.debug('zod error ' + error); // TODO Replace by domain logger with global context

            throw new UnprocessableEntityError(
                (error.issues.pop()?.path || []).map(String),
            );
        }
        throw error;
    }
};
