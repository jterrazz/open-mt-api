import { configurationFactory } from '@configuration/configuration';
import { Environment } from '@configuration/schemas/environment';

describe('configuration', () => {
    test('should return default values of configuration', async () => {
        // When
        const result = configurationFactory(Environment.Test);

        // Then
        expect(result).toEqual({
            APPLICATION: {
                LOGGER: {
                    LEVEL: 'debug',
                },
                SERVER: {
                    PORT: 9999,
                },
                VERSION: '1.0.0',
            },
            ENVIRONMENT: 'test',
            SERVICES: {
                DATABASE: {
                    URL: expect.stringMatching(/postgresql:\/\/.+/),
                },
            },
        });
    });

    test('should throw when a required variable is missing', async () => {
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
