import { IControllers, IKoaContext } from '@adapters';
import { IProjectDependencies } from '@application/contracts';
import { getUserPublicProfileFactory } from '@application/use-cases/users/get-user-public-profile';
import { serializeUserHandle } from '@adapters/serializers/users';

export const usersControllerFactory = (
    dependencies: IProjectDependencies,
): IControllers['users'] => {
    const getPublicProfile = async (ctx: IKoaContext<any, any>) => {
        // TODO replace any
        const getUserPublicProfile = getUserPublicProfileFactory(
            dependencies.logger,
            dependencies.repositories.userRepository,
        );

        // @ts-ignore // TODO COMEBACK ON THAT
        const handle = serializeUserHandle(ctx.body.handle);

        ctx.body = await getUserPublicProfile(handle);
    };

    return { getPublicProfile };
};
