import { GetHealthController } from '@domain/controllers/get-health.controller';
import { HealthMetadata } from '@domain/models/health/health-metadata';

export const getHealthControllerFactory = (
    getHealthMetadata: () => HealthMetadata,
): GetHealthController => {
    return async () => {
        return getHealthMetadata();
    };
};
