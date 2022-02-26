import { IControllers, IKoaContext } from '@adapters/controllers/index';
import { IDependencies } from '@application/contracts';
import { getUserPublicProfileFactory } from '@application/use-cases/user/get-user-public-profile';
import { serializeUserHandle } from '@adapters/serializers/user-serializer';

export const userControllerFactory = (
    dependencies: IDependencies,
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
