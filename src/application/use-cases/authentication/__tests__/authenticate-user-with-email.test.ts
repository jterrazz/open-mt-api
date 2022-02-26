import { AuthenticationRequiredError } from '@domain/error/authentication-required-error';
import { authenticateUserWithEmailFactory } from '@application/use-cases/authentication/authenticate-user-with-email';
import { createMockOfLogger } from '@application/contracts/__tests__/logger.mock';
import { createMockOfUser } from '@domain/user/__tests__/user-entity.mock';
import { createMockOfUserRepository } from '@domain/user/__tests__/user-repository.mock';

describe('use-case - authenticateUserWithEmail()', () => {
    test('authenticates a valid email:password credential', async () => {
        // Given
        const mockOfPasswordChecker = jest.fn().mockReturnValue(true);
        const authenticateUserWithEmail = authenticateUserWithEmailFactory(
            createMockOfLogger(),
            createMockOfUserRepository(),
            mockOfPasswordChecker,
        );

        // When
        const result = await authenticateUserWithEmail('', '');

        // Then
        expect(result).toEqual(createMockOfUser());
    });

    test('rejects a bad email with an unauthorized error', async () => {
        // Given
        const mockOfUserRepository = createMockOfUserRepository();
        mockOfUserRepository.getByEmail.mockResolvedValue(undefined);
        const authenticateUserWithEmail = authenticateUserWithEmailFactory(
            createMockOfLogger(),
            mockOfUserRepository,
            jest.fn(),
        );

        // When
        const ft = () => authenticateUserWithEmail('', '');

        // Then
        await expect(ft).rejects.toThrow(AuthenticationRequiredError);
    });

    test('rejects a bad password with an unauthorized error', async () => {
        // Given
        const mockOfPasswordChecker = jest.fn().mockReturnValue(false);
        const authenticateUserWithEmail = authenticateUserWithEmailFactory(
            createMockOfLogger(),
            createMockOfUserRepository(),
            mockOfPasswordChecker,
        );

        // When
        const ft = () => authenticateUserWithEmail('', '');

        // Then
        await expect(ft).rejects.toThrow(AuthenticationRequiredError);
    });
});
