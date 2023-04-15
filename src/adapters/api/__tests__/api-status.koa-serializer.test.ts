import { useFakeTimers } from '@tests/helpers/timer';
import { mock } from 'jest-mock-extended';
import Koa from 'koa';

import { API_STATUS, ApiStatusMetadata } from '@domain/api/status';

import { apiStatusKoaSerializer } from '@adapters/api/api-status.koa-serializer';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    jest.useRealTimers();
});

describe('apiStatusKoaSerializer()', () => {
    test('serializes the status information', () => {
        // Given
        const ctx = mock<Koa.Context>();
        const apiInformation: ApiStatusMetadata = {
            message: 'message',
            status: API_STATUS.UP,
            time: new Date(),
            version: 'version',
        };

        // When
        apiStatusKoaSerializer(ctx, apiInformation);

        // Then
        expect(ctx.status).toBe(200);
        expect(ctx.body).toEqual({
            message: 'message',
            status: 'UP',
            time: '2000-01-01T00:00:00.000Z',
            version: 'version',
        });
    });
});
