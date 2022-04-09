import { createEndToEndApplication } from '@tests/e2e/create-end-to-end-application';
import { seedDatabaseWithUser } from '@tests/seeds/user';
import { useFakeTimers, useRealTimers } from '@application/utils/node/timer';
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

describe('END TO END - GET /user', function () {
    test('get an existing user', async () => {
        // Given
        console.log(1);
        console.log(1);
        console.log(1);
        const userSeed = await seedDatabaseWithUser(databaseClient);
        console.log(2);
        console.log(2);
        console.log(2);
        // When
        const response = await request(app.callback()).get(
            '/user/' + userSeed.handle,
        );

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            name: 'the_shop_name',
        });
    });

    test('does not get a missing user', async () => {
        // // Given
        // const deadShopHandle = 'the_dead_shop_handle';
        //
        // // When
        // const response = await request(app.callback()).get(
        //     '/shop/' + deadShopHandle,
        // );
        //
        // // Then
        // expect(response.status).toEqual(404);
    });
});
