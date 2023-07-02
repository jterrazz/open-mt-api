import { mock } from 'jest-mock-extended';
import Router from 'koa-router';

import { apiVersionKoaMiddlewareFactory } from '@adapters/middlewares/api-version.koa-middleware';

describe('apiVersionKoaMiddleware', () => {
    test('should set api-version header', async () => {
        // Given
        const apiVersion = '1.0.0';
        const mockOfCtx = mock<Router.RouterContext>();
        const apiVersionKoaMiddleware = apiVersionKoaMiddlewareFactory(apiVersion);

        // When
        await apiVersionKoaMiddleware(mockOfCtx, jest.fn());

        // Then
        expect(mockOfCtx.set).toHaveBeenCalledWith('api-version', apiVersion);
    });
});
