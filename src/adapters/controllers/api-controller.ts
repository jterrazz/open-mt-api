import { GetApiStateKoaSerializer } from '@adapters/serializers/api/get-api-state-koa-serializer';
import { IConfiguration } from '@application/contracts';
import { IInitiatedKoaController } from '@adapters/contracts/controllers';
import { getApiStateFactory } from '@application/use-cases/api/get-api-state';

const getApiStateKoaSerializer = new GetApiStateKoaSerializer();

export const apiControllerFactory = (configuration: IConfiguration) => {
    const getState: IInitiatedKoaController = async (ctx) => {
        const getApiState = getApiStateFactory(
            configuration,
            ctx.requestTracker,
        );

        ctx.body = getApiStateKoaSerializer.serializeResponse(getApiState());
    };

    return { getState };
};
