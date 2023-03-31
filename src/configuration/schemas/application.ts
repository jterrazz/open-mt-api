import * as z from 'zod';

import { LoggerLevels } from '@application/logger/levels';

export const applicationConfigurationSchema = z.object({
    LOGGER: z.object({
        LEVEL: z.nativeEnum(LoggerLevels),
    }),
    SERVER: z.object({
        PORT: z.string().regex(/^\d+$/).transform(Number),
    }),
    VERSION: z.string(),
});

export type ApplicationConfiguration = z.infer<typeof applicationConfigurationSchema>;
