import { NotFoundError } from '@domain/error/client/not-found-error';
import { createMockOfLogger } from '@application/contracts/__tests__/logger.mock';
import { handleRequestErrorsMiddlewareFactory } from '@adapters/middlewares/handle-request-errors';

describe('handleRequestErrorsMiddleware()', () => {
    test('passes the error details to the response', async () => {
        // Given
        const ctx = { response: { body: null, status: null } };
        const next = async () => {
            throw new NotFoundError('test-error');
        };

        // When
        await handleRequestErrorsMiddlewareFactory(createMockOfLogger())(
            // @ts-ignore
            ctx,
            next,
        );

        // Then
        expect(ctx.response.status).toEqual(404);
        expect(ctx.response.body).toEqual({
            message: 'test-error',
        });
    });

    test('throws errors any random error', async () => {
        // Given
        const ctx = { response: { body: null, status: null } };
        const next = async () => {
            throw new Error('a random error');
        };

        // When
        const ft = () =>
            handleRequestErrorsMiddlewareFactory(createMockOfLogger())(
                // @ts-ignore
                ctx,
                next,
            );

        // Then
        await expect(ft).rejects.toThrow();
    });
});
