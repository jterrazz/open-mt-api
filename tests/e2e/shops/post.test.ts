import { createEndToEndApplication } from '@tests/e2e/create-end-to-end-application';
import { seedDatabaseWithShop } from '@tests/seeds/shop';
import { useFakeTimers, useRealTimers } from '@tests/utils/timer';
import request from 'supertest';

const {
    app,
    database: { client: databaseClient },
} = createEndToEndApplication();

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
            handle: 'the_new_shop_handle',
            name: 'the_new_shop_name',
        };

        // When
        const response = await request(app.callback())
            .post('/shops')
            .send(params);

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            handle: 'the_new_shop_handle',
            name: 'the_new_shop_name',
        });
        expect(response.headers['content-type']).toContain('json');
    });

    test('get an existing shop', async () => {
        // Given
        const shopSeed = await seedDatabaseWithShop(databaseClient);

        // When
        const response = await request(app.callback()).get(
            '/shops/' + shopSeed.handle,
        );

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            description: 'the_shop_description',
            handle: shopSeed.handle,
            name: 'the_shop_name',
        });
    });

    test('get a missing shop', async () => {
        // Given
        const deadShopHandle = 'the_dead_shop_handle';

        // When
        const response = await request(app.callback()).get(
            '/shops/' + deadShopHandle,
        );

        // Then
        expect(response.status).toEqual(404);
    });
});
