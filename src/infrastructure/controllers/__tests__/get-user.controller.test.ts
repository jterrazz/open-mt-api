import { mock } from 'jest-mock-extended';

import { ExposedError } from '@domain/errors/exposed.error';
import { NotFoundError } from '@domain/errors/functional/not-found.error';
import { createMockOfUser } from '@domain/models/user/__tests__/user.mock';

import { UserRepository } from '@ports/database';
import { Logger } from '@ports/logger';

import { getUserControllerFactory } from '@infrastructure/controllers/get-user.controller';

describe('getUserControllerFactory()', () => {
    test('should return a user', async () => {
        // Given
        const mockOfUser = createMockOfUser();
        const mockOfUserRepository = mock<UserRepository>({
            findById: jest.fn().mockResolvedValue(mockOfUser),
        });
        const mockOfLogger = mock<Logger>();
        const getUserController = getUserControllerFactory(mockOfUserRepository, mockOfLogger);

        // When
        const user = await getUserController(1);

        // Then
        expect(user).toEqual(mockOfUser);
    });

    test('should throw an error if user is not found', async () => {
        // Given
        const mockOfUserRepository = mock<UserRepository>({
            findById: jest.fn().mockResolvedValue(null),
        });
        const mockOfLogger = mock<Logger>();
        const getUserController = getUserControllerFactory(mockOfUserRepository, mockOfLogger);

        // When
        const ft = () => getUserController(1);

        // Then
        await expect(ft).rejects.toThrow(
            new ExposedError(
                new NotFoundError(undefined, 'User with id 1 not found'),
                'User not found',
            ),
        );
    });
});
