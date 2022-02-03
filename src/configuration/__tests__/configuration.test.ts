import { configurationFactory } from '@configuration/configuration';

describe('configuration', function () {
    test('returns original database URL with non test environments', async () => {
        // Given
        process.env.NODE_ENV = 'production';

        // When
        const configuration = configurationFactory();

        // Then
        expect(configuration.DATABASE.GENERATED_DATABASE).toBeUndefined();
        expect(configuration.DATABASE.URL).toEqual(
            'postgresql://postgres:postgres@localhost:5432/myopenmarket?schema=myopenmarket',
        );
    });
    test('replace database URL with random database name with test environment', async () => {
        // Given
        process.env.NODE_ENV = 'test';

        // When
        const configuration = configurationFactory();

        // Then
        expect(configuration.DATABASE.GENERATED_DATABASE).toBeDefined();
        expect(configuration.DATABASE.URL).toMatch(
            new RegExp(
                'postgresql:\\/\\/postgres:postgres@localhost:5432\\/[a-z0-9]{5}\\?schema=[a-z0-9]{5}',
            ),
        );
    });
});
