import { GetApiState } from '@application/../../../domain/status/get-status-state';

import { serializeApiState } from '@adapters/../../serializers/status/serialize-status-state';

import { IInitiatedKoaController } from '../koa-controller';

export const getApiStateControllerFactory = (getApiState: GetApiState): IInitiatedKoaController => {
    return async (ctx) => {
        ctx.requestTracker.requestedGetApiState();

        const apiState = getApiState();

        serializeApiState(ctx, apiState);
    };
};
