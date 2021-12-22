import { IControllers, IKoaContext } from '@adapters';
import { IProjectDependencies } from '@application/contracts';
import { getApiStateFactory } from '@application/use-cases/api/get-api-state';

export const apiControllerFactory = (
    dependencies: IProjectDependencies,
): IControllers['api'] => {
    const getState = async (ctx: IKoaContext<any, any>) => {
        // TODO Replace any
        const getApiState = getApiStateFactory(
            dependencies,
            ctx.requestTracker,
        );

        ctx.body = getApiState();
    };

    return { getState };
};
