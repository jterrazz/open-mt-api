import { mock } from 'jest-mock-extended';
import { Context } from 'koa';

import { defaultKoaSerializer } from '@adapters/default.koa-serializer';

describe('defaultKoaSerializer()', () => {
    test('returns a 200 status code', () => {
        // Given
        const ctx = mock<Context>();

        // When
        defaultKoaSerializer(ctx);

        // Then
        expect(ctx.status).toBe(200);
    });
});
