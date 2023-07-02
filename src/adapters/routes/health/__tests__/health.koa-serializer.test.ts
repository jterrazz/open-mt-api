import { useFakeTimers } from '@tests/helpers/timer';
import { mock } from 'jest-mock-extended';
import Koa from 'koa';

import { HealthMetadata } from '@domain/models/health/health-metadata';
import { HealthStatus } from '@domain/models/health/health-status';

import { healthKoaSerializer } from '@adapters/routes/health/health.koa-serializer';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    jest.useRealTimers();
});

describe('apiStatusKoaSerializer', () => {
    test('should serialize status information', () => {
        // Given
        const mockOfCtx = mock<Koa.Context>();
        const apiInformation: HealthMetadata = {
            message: 'message',
            status: HealthStatus.Up,
            time: new Date(),
            version: 'version',
        };

        // When
        healthKoaSerializer(mockOfCtx, apiInformation);

        // Then
        expect(mockOfCtx.status).toBe(200);
        expect(mockOfCtx.body).toEqual({
            message: 'message',
            status: 'Up',
            time: '2000-01-01T00:00:00.000Z',
            version: 'version',
        });
    });
});
