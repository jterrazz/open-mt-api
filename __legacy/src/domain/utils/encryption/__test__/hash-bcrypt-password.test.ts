import { checkBcryptPassword } from '../check-bcrypt-password';
import { hashBcryptPassword } from '../hash-bcrypt-password';

describe('hashBcryptPassword()', () => {
    test('creates the hash of a password', async () => {
        // Given
        const password = 'the_password';

        // When
        const result = await hashBcryptPassword(password);

        // Then
        expect(await checkBcryptPassword(password, result)).toEqual(true);
    });
});
