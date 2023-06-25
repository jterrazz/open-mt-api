import { mock } from 'jest-mock-extended';
import Koa from 'koa';

import { apiVersionKoaMiddlewareFactory } from '@adapters/middlewares/api-version.koa-middleware';

describe('apiVersionKoaMiddleware', () => {
    test('should set api-version header', () => {
        // Given
        const apiVersion = '1.0.0';
        const mockOfCtx = mock<Koa.Context>();
        const apiVersionKoaMiddleware = apiVersionKoaMiddlewareFactory(apiVersion);

        // When
        apiVersionKoaMiddleware(mockOfCtx, jest.fn());

        // Then
        expect(mockOfCtx.set).toHaveBeenCalledWith('api-version', apiVersion);
    });
});
