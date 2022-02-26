import { IControllers, IKoaContext } from '@adapters/controllers/index';
import { ILogger } from '@application/contracts';
import { IUserRepository } from '@domain/user/user-repository';
import { getUserPublicProfileFactory } from '@application/use-cases/user/get-user-public-profile';
import { serializeUserHandle } from '@adapters/serializers/user-serializer';

export const userControllerFactory = (
    logger: ILogger,
    userRepository: IUserRepository,
): IControllers['users'] => {
    const getPublicProfile = async (ctx: IKoaContext<any, any>) => {
        // TODO replace any
        const getUserPublicProfile = getUserPublicProfileFactory(
            logger,
            userRepository,
        );

        // @ts-ignore // TODO COMEBACK ON THAT
        const handle = serializeUserHandle(ctx.body.handle);

        ctx.body = await getUserPublicProfile(handle);
    };

    return { getPublicProfile };
};
