import { mock } from 'jest-mock-extended';

import { User } from '@domain/models/user/user';

import { KoaContext } from '@adapters/routes/koa-deserializer.adapter';
import { getUserKoaSerializer } from '@adapters/routes/user/get-user.koa-serializer';

describe('getUserKoaSerializer()', () => {
    test('should serialize user', () => {
        // Given
        const mockOfCtx = mock<KoaContext>();
        const user: User = {
            email: 'email',
            id: 1,
        };

        // When
        getUserKoaSerializer(mockOfCtx, user);

        // Then
        expect(mockOfCtx.status).toBe(200);
        expect(mockOfCtx.body).toEqual({
            email: 'email',
            id: 1,
        });
    });
});
