// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dangerouslyDropAllDatabaseRows } = require('../global-teardown');

afterAll(() => {
    process.env.NODE_ENV = 'test';
});

describe('dangerouslyDropAllDatabaseRows()', () => {
    test('throw if called in anything other than test environments', async () => {
        // Given
        process.env.NODE_ENV = 'development';

        // When
        const ft = () => dangerouslyDropAllDatabaseRows();

        // Then
        await expect(ft).rejects.toThrow(
            'this method should never be called in anything other than test environments',
        );
    });
});
