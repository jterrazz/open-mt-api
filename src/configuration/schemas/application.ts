import * as z from 'zod';
import { LOG_LEVELS } from '@domain/ports/logger';

export const applicationConfigurationSchema = z.object({
    LOGGER: z.object({
        LEVEL: z.nativeEnum(LOG_LEVELS),
    }),
    SERVER: z.object({
        PORT: z.string().regex(/^\d+$/).transform(Number),
    }),
    VERSION: z.string(),
});

export type ApplicationConfiguration = z.infer<typeof applicationConfigurationSchema>;
