import { mock } from 'jest-mock-extended';
import { Context } from 'koa';

import { defaultKoaSerializer } from '@adapters/routes/default.koa-serializer';

describe('defaultKoaSerializer', () => {
    test('should return 200 status code', () => {
        // Given
        const mockOfCtx = mock<Context>();

        // When
        defaultKoaSerializer(mockOfCtx);

        // Then
        expect(mockOfCtx.status).toBe(200);
    });
});
