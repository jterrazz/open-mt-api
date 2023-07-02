import { Controller } from '@domain/controllers/controller';
import { HealthMetadata } from '@domain/models/health/health-metadata';

export type GetHealthController = Controller<void, HealthMetadata>;
