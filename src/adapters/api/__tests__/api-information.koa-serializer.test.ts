import { mock } from 'jest-mock-extended';
import Koa from 'koa';

import { ApiInformation } from '@domain/api/information';
import { ApiStatus } from '@domain/api/status';

import { apiInformationKoaSerializer } from '@adapters/api/api-information.koa-serializer';

import { useFakeTimers } from '@tests/utils/timer';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    jest.useRealTimers();
});

describe('apiInformationKoaSerializer()', () => {
    test('serializes the api information', () => {
        // Given
        const ctx = mock<Koa.Context>();
        const apiInformation: ApiInformation = {
            message: 'message',
            status: ApiStatus.OK,
            time: new Date(),
            version: 'version',
        };

        // When
        apiInformationKoaSerializer(ctx, apiInformation);

        // Then
        expect(ctx.status).toBe(200);
        expect(ctx.body).toEqual({
            message: 'message',
            status: 'OK',
            time: '2000-01-01T00:00:00.000Z',
            version: 'version',
        });
    });
});
