import { configurationFactory } from '@configuration/configuration';

describe('configuration', () => {
    test('throws when a required variable is missing', async () => {
        // Given
        const nodeEnv = null;

        // When
        const ft = () => configurationFactory(nodeEnv as unknown as string);

        // Then
        expect(ft).toThrow();
    });

    test('returns application configuration', async () => {
        // When
        const result = configurationFactory();

        // Then
        expect(result).toBeDefined();
    });
});
