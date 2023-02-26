import { GetApiState } from '@application/../../../domain/api/get-api-state';
import { IInitiatedKoaController } from '../koa-controller';
import { serializeApiState } from '@adapters/../../serializers/api/serialize-api-state';

export const getApiStateControllerFactory = (getApiState: GetApiState): IInitiatedKoaController => {
    return async (ctx) => {
        ctx.requestTracker.requestedGetApiState();

        const apiState = getApiState();

        serializeApiState(ctx, apiState);
    };
};
