import { IControllers } from '@adapters/controllers/IControllers';
import { IProjectDependencies } from '@application/contracts/IProjectDependencies';
import { IRequestContext } from '@adapters/controllers/IRequestContext';
import { getApiStateFactory } from '@application/use-cases/api/get-api-state';

export const apiControllerFactory = (
    dependencies: IProjectDependencies,
): IControllers['api'] => {
    const getState = async (ctx: IRequestContext) => {
        const getApiState = getApiStateFactory(
            dependencies,
            ctx.requestTracker,
        );

        ctx.body = getApiState();
    };

    return { getState };
};
