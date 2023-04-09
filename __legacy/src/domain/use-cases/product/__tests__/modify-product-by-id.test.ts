import { ForbiddenClientError } from '../../error/client/forbidden-client-error';
import { NotFoundClientError } from '../../error/client/not-found-client-error';
import { Currency } from '../../price/currency';
import { createMockOfShopEntity } from '../../shop/__mocks__/shop.entity.mock';
import { createMockOfShopRepository } from '../../shop/__mocks__/shop.repository.mock';
import { createMockOfUserEntity } from '../../user/__mocks__/user-entity.mock';
import { createMockOfProductEntity } from '../__mocks__/product.entity.mock';
import { createMockOfProductRepository } from '../__mocks__/product.repository.mock';
import { modifyProductFactory } from '../modify-product';

const createMockOfParams = () => {
    const mockOfAuthenticatedUser = createMockOfUserEntity({ id: 0 });
    const mockOfProductRepository = createMockOfProductRepository({
        findByProductId: jest.fn().mockResolvedValue(
            createMockOfProductEntity({
                id: 0,
                shopId: 0,
            }),
        ),
    });
    const mockOfShopRepository = createMockOfShopRepository({
        findByOwnerId: jest.fn().mockResolvedValue(createMockOfShopEntity({ id: 0 })),
    });
    const newProductParams = {
        name: 'the_new_name',
        priceCentsAmount: 1,
        priceCurrency: 'USD' as Currency,
    };

    return {
        mockOfAuthenticatedUser,
        mockOfProductRepository,
        mockOfShopRepository,
        newProductParams,
    };
};

describe('use-cases / modifyProductByIdFactory()', () => {
    test('returns modified product', async () => {
        // Given
        const {
            mockOfProductRepository,
            mockOfShopRepository,
            mockOfAuthenticatedUser,
            newProductParams,
        } = createMockOfParams();

        // When
        const result = await modifyProductFactory(mockOfProductRepository, mockOfShopRepository)(
            mockOfAuthenticatedUser,
            0,
            newProductParams,
        );

        // Then
        expect(result).toEqual({
            id: 0,
            name: 'the_new_name',
            priceCentsAmount: 1,
            priceCurrency: 'USD',
            shopId: 0,
        });
    });

    test('rejects unknown products with a NotFoundError', async () => {
        // Given
        const { mockOfAuthenticatedUser, newProductParams, mockOfShopRepository } =
            createMockOfParams();
        const mockOfProductRepository = createMockOfProductRepository({
            findByProductId: jest.fn().mockResolvedValue(null),
        });

        // When
        const ft = () =>
            modifyProductFactory(mockOfProductRepository, mockOfShopRepository)(
                mockOfAuthenticatedUser,
                0,
                newProductParams,
            );

        // Then
        await expect(ft).rejects.toThrow(NotFoundClientError);
    });

    test('rejects non matching authenticated user to product owner with a ForbiddenError', async () => {
        // Given
        const { mockOfAuthenticatedUser, newProductParams, mockOfShopRepository } =
            createMockOfParams();
        const mockOfProductEntity = createMockOfProductEntity({
            id: 0,
            shopId: 2,
        });
        const mockOfProductRepository = createMockOfProductRepository({
            findByProductId: jest.fn().mockResolvedValue(mockOfProductEntity),
        });

        // When
        const ft = () =>
            modifyProductFactory(mockOfProductRepository, mockOfShopRepository)(
                mockOfAuthenticatedUser,
                0,
                newProductParams,
            );

        // Then
        await expect(ft).rejects.toThrow(ForbiddenClientError);
        expect(mockOfShopRepository.update).toHaveBeenCalledTimes(0);
    });
});
