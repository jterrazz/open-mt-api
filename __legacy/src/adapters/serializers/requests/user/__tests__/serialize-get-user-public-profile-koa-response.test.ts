import { createMockOfUserEntity } from '@domain/../../../../../domain/use-cases/user/__mocks__/user-entity.mock';

import { createMockOfInitiatedKoaContext } from '@infrastructure/../../../../../application/server/__tests__/initiated-koa-context.mock';

import { serializeGetUserPublicProfileKoaResponse } from '../serialize-get-user-public-profile-koa-response';

describe('serializeGetUserPublicProfileKoaResponse()', () => {
    test('returns basic response', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext();
        const mockOfUser = createMockOfUserEntity({
            profile: {
                firstName: 'the_first_name',
                lastName: 'the_last_name',
            },
        });

        // When
        serializeGetUserPublicProfileKoaResponse(ctx, mockOfUser);

        // Then
        expect(ctx.body).toEqual({
            firstName: 'the_first_name',
            lastName: 'the_last_name',
        });
    });
});