import { seedDatabaseWithProduct } from '@tests/../../../seeds/seed-database-with-product';

import { e2eClient } from '../../e2e-client';

const { database, requestAgent } = e2eClient();

describe('END TO END - GET /products/:productId', () => {
    test('get an existing product', async () => {
        // Given
        const { product: seededProduct } = await seedDatabaseWithProduct(database.client);

        // When
        const response = await requestAgent.get('/products/' + seededProduct.id);

        // Then
        expect(response.status).toEqual(200);

        // FIXME
        expect(response.body).toEqual({
            // description: seededProduct.description,
            id: seededProduct.id,
            // imageUrl: seededProduct, // TODO
            name: seededProduct.name,
            priceCentsAmount: seededProduct.priceCentsAmount,
            priceCurrency: seededProduct.priceCurrency,
        });
    });
});
