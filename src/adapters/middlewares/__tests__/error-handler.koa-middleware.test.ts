import { mock } from 'jest-mock-extended';
import Router from 'koa-router';

import { ExposedError } from '@domain/errors/exposed.error';
import { NotFoundError } from '@domain/errors/functional/not-found.error';

import { Logger } from '@ports/logger';

import { errorHandlerKoaMiddlewareFactory } from '@adapters/middlewares/error-handler.koa-middleware';

const errorHandlerKoaMiddleware = errorHandlerKoaMiddlewareFactory(mock<Logger>());
const mockOfTechnicalError = new Error('error');

describe('errorHandlerKoaMiddleware()', () => {
    test('should respond with 500 when error is thrown', async () => {
        // Given
        const mockOfCtx = mock<Router.RouterContext>();
        const mockOfNext = jest.fn().mockRejectedValue(new Error('error'));

        // When
        await errorHandlerKoaMiddleware(mockOfCtx, mockOfNext);

        // Then
        expect(mockOfCtx.status).toEqual(500);
        expect(mockOfCtx.body).toEqual({
            message: 'Internal server error',
        });
    });

    test('should respond with 500 when NotFoundError is thrown', async () => {
        // Given
        const mockOfCtx = mock<Router.RouterContext>();
        const mockOfNext = jest.fn().mockRejectedValue(new NotFoundError(mockOfTechnicalError));

        // When
        await errorHandlerKoaMiddleware(mockOfCtx, mockOfNext);

        // Then
        expect(mockOfCtx.status).toEqual(500);
        expect(mockOfCtx.body).toEqual({
            message: 'Internal server error',
        });
    });

    test('should respond with 404 when an ExposedError / NotFoundError is thrown', async () => {
        // Given
        const mockOfCtx = mock<Router.RouterContext>();
        const mockOfNext = jest
            .fn()
            .mockRejectedValue(new ExposedError(new NotFoundError(mockOfTechnicalError)));

        // When
        await errorHandlerKoaMiddleware(mockOfCtx, mockOfNext);

        // Then
        expect(mockOfCtx.status).toEqual(404);
        expect(mockOfCtx.body).toEqual({
            message: 'Not found',
        });
    });
});
