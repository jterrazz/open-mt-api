import { TestContext } from '@tests/e2e/context';
import { dangerouslySeedUser } from '@tests/e2e/seeds/user';

import { applicationInjector } from '@application/injector';

beforeAll(async () => {
    await TestContext.database().connect();
});

describe('Prisma - User Repository', () => {
    const userRepository = applicationInjector.resolve('repositories').userRepository;

    describe('findByEmail()', () => {
        test('should return null when a user is not found', async () => {
            // Given
            const unknownEmail = 'unknown@example.com';

            // When
            const user = await userRepository.findByEmail(unknownEmail);

            // Then
            expect(user).toBeNull();
        });

        test('should return a user when found', async () => {
            // Given
            const seededUser = await dangerouslySeedUser();

            // When
            const user = await userRepository.findByEmail(seededUser.email);

            // Then
            expect(user).toMatchObject(seededUser);
        });
    });

    describe('findById()', () => {
        test('should return null when a user is not found', async () => {
            // Given
            const unknownId = -1;

            // When
            const user = await userRepository.findById(unknownId);

            // Then
            expect(user).toBeNull();
        });

        test('should return a user when found', async () => {
            // Given
            const seededUser = await dangerouslySeedUser();

            console.log(seededUser);

            // When
            const user = await userRepository.findById(seededUser.id);

            // Then
            expect(user).toMatchObject(seededUser);
        });
    });
});
