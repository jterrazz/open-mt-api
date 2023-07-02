import { HealthStatus } from '@domain/models/health/health-status';

export interface HealthMetadata {
    status: HealthStatus;
    message: string;
    time: Date;
    version: string;
}
