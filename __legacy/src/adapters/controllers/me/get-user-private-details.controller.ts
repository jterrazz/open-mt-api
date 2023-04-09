import { IInitiatedKoaController } from '../koa-controller';

export const getUserPrivateDetailsControllerFactory = (): IInitiatedKoaController => {
    return async (ctx) => {
        ctx.requestTracker.requestedGetUserPrivateSettings();
    };
};
