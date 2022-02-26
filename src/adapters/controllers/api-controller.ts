import { IConfiguration } from '@application/contracts';
import { IControllers } from '@adapters/controllers/index';
import { getApiStateFactory } from '@application/use-cases/api/get-api-state';

export const apiControllerFactory = (
    configuration: IConfiguration,
): IControllers['api'] => {
    const getState: IControllers['api']['getState'] = async (ctx) => {
        const getApiState = getApiStateFactory(
            configuration,
            ctx.requestTracker,
        );

        ctx.body = getApiState();
    };

    return { getState };
};
