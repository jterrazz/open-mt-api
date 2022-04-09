import { UnprocessableEntityError } from '@domain/error/client/unprocessable-entity-error';
import { ZodError } from 'zod';
import { mapZodErrorToUnprocessableEntityError } from '@application/utils/zod/map-unprocessable-entity-error';

describe('mapZodErrorToUnprocessableEntityError()', () => {
    test('map a missing property error to an UnprocessableEntityError', async () => {
        // Given
        const zodError = new ZodError([
            {
                code: 'invalid_type',
                expected: 'date',
                message: 'the_message',
                path: ['the_path'],
                received: 'date',
            },
        ]);

        // When
        let resultError;
        try {
            mapZodErrorToUnprocessableEntityError(() => {
                throw zodError;
            });
        } catch (error) {
            resultError = error;
        }

        // Then
        await expect(resultError).toBeInstanceOf(UnprocessableEntityError);
        await expect(resultError.publicMeta).toEqual({ fields: ['the_path'] });
    });
});
