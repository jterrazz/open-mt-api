import { KoaRoute } from '@application/server/routes/koa-route';

import { GetMeController } from '@domain/user/get-me.controller';

import { Logger } from '@ports/logger';
import { UserRepository } from '@ports/repositories/user-repository';

import { getMeKoaDeserializer } from '@adapters/me/get-me.koa-deserializer';
import { getMeKoaSerializer } from '@adapters/me/get-me.koa-serializer';

import { getMeControllerFactory } from '@infrastructure/user/get-me.controller';

export class GetMeStatusKoaRoute extends KoaRoute<GetMeController> {
    public static inject = ['repositories', 'logger'] as const;

    constructor({ userRepository }: { userRepository: UserRepository }, logger: Logger) {
        const getMeController = getMeControllerFactory(userRepository, logger);

        super(getMeKoaDeserializer, getMeController, getMeKoaSerializer);
    }
}
