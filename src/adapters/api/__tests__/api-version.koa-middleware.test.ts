import { mock } from 'jest-mock-extended';
import Koa from 'koa';

import { apiVersionKoaMiddlewareFactory } from '@adapters/api/api-version.koa-middleware';

describe('apiVersionKoaMiddleware()', () => {
    test('sets the api-version header', () => {
        // Given
        const apiVersion = '1.0.0';
        const ctx = mock<Koa.Context>();
        const apiVersionKoaMiddleware = apiVersionKoaMiddlewareFactory(apiVersion);

        // When
        apiVersionKoaMiddleware(ctx, jest.fn());

        // Then
        expect(ctx.set).toHaveBeenCalledWith('api-version', apiVersion);
    });
});
