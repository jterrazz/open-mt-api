import * as z from 'zod';

export const servicesConfigurationSchema = z.object({
    DATABASE: z.object({
        URL: z.string(),
    }),
});

export type ServicesConfiguration = z.infer<typeof servicesConfigurationSchema>;
