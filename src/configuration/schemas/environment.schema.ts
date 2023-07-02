import * as z from 'zod';

import { Environment } from '@application/environment';

export const environmentConfigurationSchema = z.enum([
    Environment.Development,
    Environment.Production,
    Environment.Test,
]);

export type EnvironmentConfiguration = z.infer<typeof environmentConfigurationSchema>;
