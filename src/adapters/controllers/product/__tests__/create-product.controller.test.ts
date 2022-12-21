import { AuthenticationRequiredClientError } from '@domain/use-cases/error/client/authentication-required-client-error';
import { ForbiddenClientError } from '@domain/use-cases/error/client/forbidden-client-error';
import { createMockOfInitiatedKoaContext } from '@infrastructure/../../../../application/webserver/__tests__/initiated-koa-context.mock';
import { createMockOfProductEntity } from '@domain/use-cases/product/__mocks__/product.entity.mock';
import { createMockOfShopRepository } from '@domain/use-cases/shop/__mocks__/shop.repository.mock';
import { createMockOfUserEntity } from '@domain/use-cases/user/__mocks__/user-entity.mock';
import { createProductControllerFactory } from '@adapters/controllers/product/create-product.controller';

const createMockOfArguments = () => {
    return {
        mockOfCreateProduct: jest
            .fn()
            .mockResolvedValue(createMockOfProductEntity()),
        mockOfDeserializer: jest.fn().mockReturnValue({
            authenticatedUser: createMockOfUserEntity(),
            productParams: {},
        }),
        mockOfSerializer: jest.fn(),
        mockOfShopRepository: createMockOfShopRepository(),
    };
};

describe('createProductController()', () => {
    test('calls a tracker event', async () => {
        // Given
        const {
            mockOfCreateProduct,
            mockOfShopRepository,
            mockOfDeserializer,
            mockOfSerializer,
        } = createMockOfArguments();
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        await createProductControllerFactory(
            mockOfCreateProduct,
            mockOfShopRepository,
            mockOfDeserializer,
            mockOfSerializer,
        )(mockOfCtx);

        // Then
        expect(
            mockOfCtx.requestTracker.requestedCreateProduct,
        ).toHaveBeenCalledTimes(1);
    });

    test('fails if user is not authenticated', async () => {
        // Given
        const {
            mockOfCreateProduct,
            mockOfShopRepository,
            mockOfDeserializer,
            mockOfSerializer,
        } = createMockOfArguments();
        mockOfDeserializer.mockReturnValue({});
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        const ft = () =>
            createProductControllerFactory(
                mockOfCreateProduct,
                mockOfShopRepository,
                mockOfDeserializer,
                mockOfSerializer,
            )(mockOfCtx);

        // Then
        await expect(ft).rejects.toThrow(AuthenticationRequiredClientError);
    });

    test('fails if user has not created a shop', async () => {
        // Given
        const {
            mockOfCreateProduct,
            mockOfShopRepository,
            mockOfDeserializer,
            mockOfSerializer,
        } = createMockOfArguments();
        mockOfShopRepository.findByOwnerId.mockResolvedValue(null);
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        const ft = () =>
            createProductControllerFactory(
                mockOfCreateProduct,
                mockOfShopRepository,
                mockOfDeserializer,
                mockOfSerializer,
            )(mockOfCtx);

        // Then
        await expect(ft).rejects.toThrow(ForbiddenClientError);
    });

    test('creates a product', async () => {
        // Given
        const {
            mockOfCreateProduct,
            mockOfShopRepository,
            mockOfDeserializer,
            mockOfSerializer,
        } = createMockOfArguments();
        const mockOfCtx = createMockOfInitiatedKoaContext();
        mockOfCreateProduct.mockResolvedValue(createMockOfProductEntity());

        // When
        await createProductControllerFactory(
            mockOfCreateProduct,
            mockOfShopRepository,
            mockOfDeserializer,
            mockOfSerializer,
        )(mockOfCtx);

        // Then
        // expect(mockOfSerializer).toHaveBeenCalled();
        expect(mockOfCtx.status).toEqual(201);
        expect(mockOfCtx.body).toEqual(
            expect.objectContaining({
                id: 0,
            }),
        );
    });
});
