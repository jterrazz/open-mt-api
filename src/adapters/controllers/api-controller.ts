import { IControllers } from '@adapters/controllers/index';
import { IDependencies } from '@application/contracts';
import { getApiStateFactory } from '@application/use-cases/api/get-api-state';

export const apiControllerFactory = (
    dependencies: IDependencies,
): IControllers['api'] => {
    const getState: IControllers['api']['getState'] = async (ctx) => {
        const getApiState = getApiStateFactory(
            dependencies,
            ctx.requestTracker,
        );

        ctx.body = getApiState();
    };

    return { getState };
};
