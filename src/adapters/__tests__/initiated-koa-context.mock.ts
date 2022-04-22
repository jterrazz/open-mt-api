import { IInitiatedKoaContext } from '@adapters/controller';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { createMockOfTrackerRepository } from '@domain/tracker/__tests__/tracker-repository.mock';
import { createMockOfUser } from '@domain/user/__tests__/user-entity.mock';

export const createMockOfInitiatedKoaContext = (
    overrideParams?: Partial<IInitiatedKoaContext> | { response: any },
    withAuthenticatedUser = false,
): IInitiatedKoaContext => {
    return {
        ...createMockContext(),
        authenticatedUser: withAuthenticatedUser
            ? createMockOfUser()
            : undefined,
        requestTracker: createMockOfTrackerRepository(),
        ...overrideParams,
    };
};