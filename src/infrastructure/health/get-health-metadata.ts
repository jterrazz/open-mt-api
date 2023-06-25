import { HealthMetadata } from '@domain/models/health/health-metadata';
import { HealthStatus } from '@domain/models/health/health-status';

export const getHealthMetadataFactory = (apiVersion: string): (() => HealthMetadata) => {
    return () => ({
        message: 'Hello World!',
        status: HealthStatus.Up,
        time: new Date(),
        version: apiVersion,
    });
};
