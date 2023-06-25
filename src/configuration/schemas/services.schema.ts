import * as z from 'zod';

export const servicesConfigurationSchema = z.object({});

export type ServicesConfiguration = z.infer<typeof servicesConfigurationSchema>;
