import { checkBcryptPassword } from '@infrastructure/encryption/check-bcrypt-password';

describe('checkBcryptPassword()', () => {
    test('compares a valid password to its hash', async () => {
        // Given
        const hash =
            '$2b$10$vze1c82KGzoAQ64JGGh0WOh8I6cblWaqrqXPhW8ym4wsALrYxocJK';
        const password = 'the_password';

        // When
        const result = await checkBcryptPassword(password, hash);

        // Then
        expect(result).toEqual(true);
    });

    test('compares a wrong password to its hash', async () => {
        // Given
        const hash =
            '$2b$10$vze1c82KGzoAQ64JGGh0WOh8I6cblWaqrqXPhW8ym4wsALrYxocJK';
        const password = 'the_wrong_password';

        // When
        const result = await checkBcryptPassword(password, hash);

        // Then
        expect(result).toEqual(false);
    });
});
