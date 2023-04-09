import * as z from 'zod';

export enum Environment {
    DEVELOPMENT = 'development',
    TEST = 'test',
    PRODUCTION = 'production',
}

export const environmentConfigurationSchema = z.enum([
    Environment.DEVELOPMENT,
    Environment.PRODUCTION,
    Environment.TEST,
]);

export type EnvironmentConfiguration = z.infer<typeof environmentConfigurationSchema>;
