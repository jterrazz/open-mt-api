import { GetApiState } from '@application/use-cases/api/get-api-state';
import { IInitiatedKoaController } from '@adapters/controllers/koa-controller';
import { serializeApiState } from '@adapters/serializers/api/serialize-api-state';

export const getApiStateControllerFactory = (
    getApiState: GetApiState,
): IInitiatedKoaController => {
    return async (ctx) => {
        ctx.requestTracker.requestedGetApiState();

        const apiState = getApiState();

        serializeApiState(ctx, apiState);
    };
};
