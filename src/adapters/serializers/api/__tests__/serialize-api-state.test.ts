import { createMockOfInitiatedKoaContext } from '@infrastructure/../../../../application/webserver/__tests__/initiated-koa-context.mock';
import { serializeApiState } from '@adapters/serializers/api/serialize-api-state';

describe('serializeApiState()', () => {
    test('should serialize the API state', () => {
        // Given
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        serializeApiState(mockOfCtx, {
            env: 'test',
            state: 'test',
            time: new Date('2000-01-01'),
            version: 'test',
        });

        // Then
        expect(mockOfCtx.body).toEqual({
            env: 'test',
            state: 'test',
            time: '2000-01-01T00:00:00.000Z',
            version: 'test',
        });
    });
});
