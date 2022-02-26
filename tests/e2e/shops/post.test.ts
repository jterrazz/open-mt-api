import { createEndToEndApplication } from '@tests/e2e/create-end-to-end-application';
import { createSeedOfShop } from '@tests/seeds/shop';
import { useFakeTimers, useRealTimers } from '@tests/utils/jest';
import request from 'supertest';

const { app, database } = createEndToEndApplication();

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
        const response = await request(app.callback())
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

    test('get an existing shop', async () => {
        // Given
        const shopSeed = await createSeedOfShop(database);

        // When
        const response = await request(app.callback()).get(
            '/shops/' + shopSeed.handle,
        );

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            description: null,
            handle: shopSeed.handle,
            name: 'the-shop-name',
        });
    });

    test('get a missing shop', async () => {
        // Given
        const deadShopHandle = 'the-dead-shop-handle';

        // When
        const response = await request(app.callback()).get(
            '/shops/' + deadShopHandle,
        );

        // Then
        expect(response.status).toEqual(404);
    });
});
