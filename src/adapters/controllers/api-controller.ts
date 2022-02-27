import { IConfiguration } from '@application/contracts';
import { IInitiatedController } from '@adapters/contracts/controllers';
import { getApiStateFactory } from '@application/use-cases/api/get-api-state';

export const apiControllerFactory = (configuration: IConfiguration) => {
    const getState: IInitiatedController<any, any, any> = async (ctx) => {
        const getApiState = getApiStateFactory(
            configuration,
            ctx.requestTracker,
        );

        ctx.body = getApiState();
    };

    return { getState };
};
