import { createMockOfConfiguration } from '@configuration/__tests__/configuration.mock';
import { createMockOfInitiatedKoaContext } from '@infrastructure/../../../application/server/__tests__/initiated-koa-context.mock';
import { setResponseHeadersMiddlewareFactory } from '../set-response-headers.middleware';

const setResponseHeadersMiddleware = setResponseHeadersMiddlewareFactory(
    createMockOfConfiguration(),
);

describe('setResponseHeadersMiddleware', () => {
    test('sets the response headers', async () => {
        // Given
        const mockOfSetHeaders = jest.fn();
        const ctx = createMockOfInitiatedKoaContext({
            set: mockOfSetHeaders,
        });

        // When
        await setResponseHeadersMiddleware(ctx, jest.fn());

        // Then
        expect(ctx.set).toHaveBeenCalledWith('Api-Version', '1.0.0');
    });
});