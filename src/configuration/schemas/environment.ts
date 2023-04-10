import * as z from 'zod';

export enum Environment {
    Development = 'development',
    Test = 'test',
    Production = 'production',
}

export const environmentConfigurationSchema = z.enum([
    Environment.Development,
    Environment.Production,
    Environment.Test,
]);

export type EnvironmentConfiguration = z.infer<typeof environmentConfigurationSchema>;
