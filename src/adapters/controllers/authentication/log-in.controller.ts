import { IInitiatedKoaController } from '@adapters/controllers/koa-controller';
import { SerializeLoginKoaResponse } from '@adapters/serializers/requests/authentication/serialize-login-koa-response';

export const logInControllerFactory = (
    serializeLoginKoaResponse: SerializeLoginKoaResponse,
): IInitiatedKoaController => {
    return async (ctx) => {
        ctx.requestTracker.requestedLogIn();

        serializeLoginKoaResponse(ctx);
    };
};
