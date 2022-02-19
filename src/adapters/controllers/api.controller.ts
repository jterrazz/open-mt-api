import { IController, IControllers } from '@adapters/controllers/controllers';
import { IDependencies } from '@application/contracts';
import { getApiStateFactory } from '@application/use-cases/api/get-api-state';

export const apiControllerFactory = (
    dependencies: IDependencies,
): IControllers['api'] => {
    const getState: IController<any, any> = async (ctx) => {
        // TODO Replace any
        const getApiState = getApiStateFactory(
            dependencies,
            ctx.requestTracker,
        );

        ctx.body = getApiState();
    };

    return { getState };
};
