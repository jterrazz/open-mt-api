import { AuthenticationRequiredClientError } from '@domain/../../../../domain/use-cases/error/client/authentication-required-client-error';

import { createMockOfInitiatedKoaContext } from '@infrastructure/../../../../application/server/__tests__/initiated-koa-context.mock';

import { modifyProductControllerFactory } from '../modify-product.controller';

const createMockOfArguments = () => {
    return {
        mockOfDeserializer: jest.fn().mockReturnValue({}),
        mockOfModifyProductById: jest.fn(),
        mockOfSerializer: jest.fn(),
    };
};

describe('modifyProductController()', () => {
    test('calls a tracker event', async () => {
        // Given
        const { mockOfModifyProductById, mockOfDeserializer, mockOfSerializer } =
            createMockOfArguments();
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        await modifyProductControllerFactory(
            mockOfModifyProductById,
            mockOfDeserializer,
            mockOfSerializer,
        )(mockOfCtx).catch(() => {});

        // Then
        expect(mockOfCtx.requestTracker.requestedModifyProduct).toHaveBeenCalledTimes(1);
    });

    test('fails if user is not authenticated', async () => {
        // Given
        const { mockOfModifyProductById, mockOfDeserializer, mockOfSerializer } =
            createMockOfArguments();
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        const ft = () =>
            modifyProductControllerFactory(
                mockOfModifyProductById,
                mockOfDeserializer,
                mockOfSerializer,
            )(mockOfCtx);

        // Then
        await expect(ft).rejects.toThrow(AuthenticationRequiredClientError);
    });
});