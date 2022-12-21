import { IInitiatedKoaContext } from '@adapters/controllers/koa-controller';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { createMockOfTrackerRepository } from '@domain/use-cases/tracker/__mocks__/tracker-repository.mock';
import { createMockOfUserEntity } from '@domain/use-cases/user/__mocks__/user-entity.mock';

export const createMockOfInitiatedKoaContext = (
    overrideParams?:
        | Partial<IInitiatedKoaContext>
        | { response: any }
        | { request: any },
    withAuthenticatedUser = false,
): IInitiatedKoaContext => {
    return {
        ...createMockContext(),
        authenticatedUser: withAuthenticatedUser
            ? createMockOfUserEntity()
            : undefined,
        logout: jest.fn(),
        requestTracker: createMockOfTrackerRepository(),
        ...overrideParams,
    };
};
