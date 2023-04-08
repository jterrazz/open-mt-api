import { ZodError } from 'zod';

import { UnprocessableEntityClientError } from '../../../use-cases/error/client/unprocessable-entity-client-error';
import { zodErrorToUnprocessableEntityErrorWrapper } from '../zod-error-to-unprocessable-entity-error-wrapper';

describe('zodErrorToUnprocessableEntityErrorWrapper()', () => {
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
            zodErrorToUnprocessableEntityErrorWrapper(() => {
                throw zodError;
            });
        } catch (error) {
            resultError = error;
        }

        // Then
        await expect(resultError).toBeInstanceOf(UnprocessableEntityClientError);
        await expect(resultError.publicMeta).toEqual({ fields: ['the_path'] });
    });
});