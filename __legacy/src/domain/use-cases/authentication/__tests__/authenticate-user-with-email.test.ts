import { createMockOfLogger } from '@ports/__tests__/logger.mock';

import { AuthenticationRequiredClientError } from '../../error/client/authentication-required-client-error';
import { createMockOfUserEntity } from '../../user/__mocks__/user-entity.mock';
import { createMockOfUserRepository } from '../../user/__mocks__/user-repository.mock';
import { authenticateUserWithEmailFactory } from '../authenticate-user-with-email';

const createMockOfArgs = () => {
    const mockOfLogger = createMockOfLogger();
    const mockOfUserRepository = createMockOfUserRepository();
    const mockOfPasswordChecker = jest.fn().mockResolvedValue(true);

    return {
        mockOfLogger,
        mockOfPasswordChecker,
        mockOfUserRepository,
    };
};

describe('use-cases / authenticateUserWithEmail()', () => {
    test('authenticates a valid email:password request', async () => {
        // Given
        const { mockOfLogger, mockOfPasswordChecker, mockOfUserRepository } = createMockOfArgs();

        // When
        const result = await authenticateUserWithEmailFactory(
            mockOfLogger,
            mockOfUserRepository,
            mockOfPasswordChecker,
        )('', '');

        // Then
        expect(result).toEqual(createMockOfUserEntity());
    });

    test('rejects a bad email with an unauthorized error', async () => {
        // Given
        const { mockOfLogger, mockOfPasswordChecker } = createMockOfArgs();
        const mockOfUserRepository = createMockOfUserRepository({
            findByEmail: jest.fn().mockReturnValue(null),
        });

        // When
        const ft = () =>
            authenticateUserWithEmailFactory(
                mockOfLogger,
                mockOfUserRepository,
                mockOfPasswordChecker,
            )('', '');

        // Then
        await expect(ft).rejects.toThrow(AuthenticationRequiredClientError);
    });

    test('rejects a bad password with an unauthorized error', async () => {
        // Given
        const { mockOfLogger, mockOfUserRepository } = createMockOfArgs();
        const mockOfPasswordChecker = jest.fn().mockReturnValue(false);

        // When
        const ft = () =>
            authenticateUserWithEmailFactory(
                mockOfLogger,
                mockOfUserRepository,
                mockOfPasswordChecker,
            )('', '');

        // Then
        await expect(ft).rejects.toThrow(AuthenticationRequiredClientError);
    });
});
