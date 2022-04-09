import { GetUserKoaSerializer } from '@adapters/serializers/user/get-user-koa-serializer';
import { IInitiatedKoaController } from '@adapters/contracts/controllers';
import { ILogger } from '@application/contracts';
import { IUserRepository } from '@domain/user/user-repository';
import { NotFoundError } from '@domain/error/client/not-found-error';
import { getUserPublicProfileFactory } from '@application/use-cases/user/get-user-public-profile';

const getUserKoaSerializer = new GetUserKoaSerializer();

export const userControllerFactory = (
    logger: ILogger,
    userRepository: IUserRepository,
) => {
    const getPublicProfile: IInitiatedKoaController = async (ctx) => {
        const { userHandle } = getUserKoaSerializer.deserializeRequest(ctx);
        const getUserPublicProfile = getUserPublicProfileFactory(
            logger,
            userRepository,
        );

        const userPublicProfile = await getUserPublicProfile(userHandle);

        if (!userPublicProfile) {
            throw new NotFoundError();
        }

        getUserKoaSerializer.serializeResponse(ctx, userPublicProfile);
    };

    return { getPublicProfile };
};
