import { applicationInjector } from '@application/injector';
import { koaRouteFactory } from '@application/server/routes/koa-route';

import { getUserKoaDeserializer } from '@adapters/routes/user/get-user.koa-deserializer';
import { getUserKoaSerializer } from '@adapters/routes/user/get-user.koa-serializer';

import { getUserControllerFactory } from '@infrastructure/controllers/get-user.controller';

export const getUserByIdKoaRouteFactory = () => {
    const userRepository = applicationInjector.resolve('repositories').userRepository;
    const logger = applicationInjector.resolve('logger');

    const getUserController = getUserControllerFactory(userRepository, logger);

    return koaRouteFactory(logger, getUserController, getUserKoaDeserializer, getUserKoaSerializer);
};
