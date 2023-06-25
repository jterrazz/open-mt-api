import { mock } from 'jest-mock-extended';
import { Context } from 'koa';

import { ExposedError } from '@domain/errors/exposed.error';
import { NotFoundError } from '@domain/errors/functional/not-found.error';

import { Logger } from '@ports/logger';

import { errorHandlerKoaMiddlewareFactory } from '@adapters/middlewares/error-handler.koa-middleware';

const errorHandlerKoaMiddleware = errorHandlerKoaMiddlewareFactory(mock<Logger>());

describe('errorHandlerKoaMiddleware()', () => {
    test('should respond with 500 when error is thrown', async () => {
        // Given
        const mockOfCtx = mock<Context>();
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
        const mockOfCtx = mock<Context>();
        const mockOfNext = jest.fn().mockRejectedValue(new NotFoundError('error'));

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
        const mockOfCtx = mock<Context>();
        const mockOfNext = jest
            .fn()
            .mockRejectedValue(new ExposedError(new NotFoundError('error')));

        // When
        await errorHandlerKoaMiddleware(mockOfCtx, mockOfNext);

        // Then
        expect(mockOfCtx.status).toEqual(404);
        expect(mockOfCtx.body).toEqual({
            message: 'Not found',
        });
    });
});
