import {
    EndToEndApplication,
    createEndToEndApplication,
} from '@tests/e2e/end-to-end-application';
import { createSeedOfShop } from '@tests/seeds/shop';
import { useFakeTimers, useRealTimers } from '@tests/utils/jest';
import request from 'supertest';

const endToEndApplication = createEndToEndApplication();

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

describe('END TO END - POST /shops.ts', function () {
    test('creates a new shop', async () => {
        // Given
        const params = {
            handle: 'the-shop-handle',
            name: 'the-shop-name',
        };

        // When
        const response = await request(
            endToEndApplication.webServerApplication.callback(),
        )
            .post('/shops')
            .send(params);

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            handle: 'the-shop-handle',
            name: 'the-shop-name',
        });
        expect(response.headers['content-type']).toContain('json');
    });

    // TODO To fix
    // test('get an existing shop', async () => {
    //     // Given
    //     const shopSeed = await createSeedOfShop(endToEndApplication.database);
    //
    //     // When
    //     const response = await request(
    //         endToEndApplication.webServerApplication.callback(),
    //     ).get('/shops/' + shopSeed.handle);
    //
    //     // Then
    //     expect(response.status).toEqual(200);
    //     expect(response.body).toEqual({
    //         handle: 'the-shop-handle',
    //         name: 'the-shop-name',
    //     });
    // });

    // test('get a missing shop', async () => {
    //     // Given
    //
    //
    //     // When
    //
    //
    //     // Then
    //
    // })
});
