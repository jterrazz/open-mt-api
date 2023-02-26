import * as z from 'zod';

export const environmentConfigurationSchema = z.enum(['development', 'test', 'production']);

export type EnvironmentConfiguration = z.infer<typeof environmentConfigurationSchema>;
