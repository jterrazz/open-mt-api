import { configurationFactory } from '@configuration/configuration';

describe('configuration', () => {
    test('returns application configuration', async () => {
        // When
        const result = configurationFactory();

        // Then
        expect(result).toEqual({
            APPLICATION: {
                LOGGER: {
                    LEVEL: 'error',
                },
                SERVER: {
                    PORT: 9999,
                },
                VERSION: '1.0.0',
            },
            ENVIRONMENT: 'test',
            SERVICES: {
                DATABASE: {
                    URL: 'postgresql://postgres:postgres@127.0.0.1:5432/open_market?pool_timeout=30&connect_timeout=30',
                },
            },
        });
    });

    test('throws when a required variable is missing', async () => {
        // Given
        const nodeEnv = null;

        // When
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const ft = () => configurationFactory(nodeEnv);

        // Then
        expect(ft).toThrow();
    });
});
