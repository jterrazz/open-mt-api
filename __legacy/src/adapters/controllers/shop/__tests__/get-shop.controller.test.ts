import { NotFoundClientError } from '@domain/../../../../domain/use-cases/error/client/not-found-client-error';

import { createMockOfInitiatedKoaContext } from '@infrastructure/../../../../application/server/__tests__/initiated-koa-context.mock';

import { getShopControllerFactory } from '../get-shop.controller';

const createMockOfArgs = () => {
    return {
        mockOfDeserializer: jest.fn().mockResolvedValue({}),
        mockOfGetShop: jest.fn().mockResolvedValue({}),
        mockOfSerializer: jest.fn(),
    };
};

describe('getShop()', () => {
    test('calls a tracker event', async () => {
        // Given
        const { mockOfGetShop, mockOfDeserializer, mockOfSerializer } = createMockOfArgs();
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        await getShopControllerFactory(
            mockOfGetShop,
            mockOfDeserializer,
            mockOfSerializer,
        )(mockOfCtx);

        // Then
        expect(mockOfCtx.requestTracker.requestedGetShop).toHaveBeenCalledTimes(1);
    });

    test('fails if no shop is found', async () => {
        // Given
        const { mockOfGetShop, mockOfDeserializer, mockOfSerializer } = createMockOfArgs();
        const mockOfCtx = createMockOfInitiatedKoaContext();
        mockOfGetShop.mockReturnValue(null);

        // When
        const ft = () =>
            getShopControllerFactory(
                mockOfGetShop,
                mockOfDeserializer,
                mockOfSerializer,
            )(mockOfCtx);

        // Then
        await expect(ft).rejects.toThrow(NotFoundClientError);
    });
});
