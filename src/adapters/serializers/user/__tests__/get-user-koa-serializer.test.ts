import { GetUserKoaSerializer } from '@adapters/serializers/user/get-user-koa-serializer';
import { UnprocessableEntityError } from '@domain/error/client/unprocessable-entity-error';
import { createMockOfInitiatedKoaContext } from '@adapters/contracts/__tests__/initiated-koa-context.mock';

describe('GetUserKoaSerializer', () => {
    const getUserKoaSerializer = new GetUserKoaSerializer();

    describe('serializeResponse()', () => {
        test('returns basic response', async () => {
            // Given
            const ctx = createMockOfInitiatedKoaContext();
            const params = {
                firstName: 'the_first_name',
                lastName: 'the_last_name',
            };

            // When
            getUserKoaSerializer.serializeResponse(ctx, params);

            // Then
            expect(ctx.body).toEqual({
                firstName: 'the_first_name',
                lastName: 'the_last_name',
            });
        });
    });

    describe('deserializeRequest()', () => {
        test('succeeds if all params are provided', async () => {
            // Given
            const ctx = createMockOfInitiatedKoaContext({
                params: { userHandle: 'user_handle' },
            });

            // When
            const result = getUserKoaSerializer.deserializeRequest(ctx);

            // Then
            expect(result).toEqual({ userHandle: 'user_handle' });
        });

        test('fails if all params are provided', async () => {
            // Given
            const ctx = createMockOfInitiatedKoaContext({
                params: {},
            });

            // When
            const ft = () => getUserKoaSerializer.deserializeRequest(ctx);

            // Then
            expect(ft).toThrow(UnprocessableEntityError);
        });
    });
});
