import { Configuration, configurationFactory } from '@configuration/configuration';

import { loggerFactory } from '@application/logger/logger';
import { koaRouterFactory } from '@application/server/koa.router';
import { koaServerFactory } from '@application/server/koa.server';

import { Database } from '@ports/database';
import { Logger } from '@ports/logger';
import { Server } from '@ports/server';

interface ApplicationDependencies {
    configuration: Configuration;
    database: Database;
    logger: Logger;
    server: Server;
}

export const applicationDependenciesFactory = (): ApplicationDependencies => {
    const configuration = configurationFactory();
    const logger = loggerFactory();
    const database: Database = {
        // const prismaDatabase = prismaDatabaseFactory(configuration, logger);
        connect: async () => {},
        disconnect: async () => {},
    };

    return {
        configuration,
        database,
        logger,
        server: koaServerFactory(logger, koaRouterFactory()),
    };
};

// // Domain
//
// const initTrackerFactory = [
//     initTrackerForRequestMixpanelFactory,
//     initTrackerForRequestInMemoryFactory,
// ].find((strategy) => strategy.isApplicable(configuration));
//
// if (!initTrackerFactory) {
//     throw new Error(
//         `a tracker repository was not found for environment ${configuration.ENVIRONMENT}`,
//     );
// }
//
// const initTracker = initTrackerFactory.factory(configuration);
//
// const productRepository = productRepositoryPrismaFactory(prismaDatabase.client);
// const shopRepository = shopRepositoryPrismaFactory(prismaDatabase.client);
// const userRepository = userRepositoryPrismaFactory(prismaDatabase.client);
//
// // Use cases
//
// const getApiState = getApiStateFactory(configuration);
// const createShop = createShopFactory(shopRepository);
// const getShop = getShopFactory(shopRepository);
// const createProduct = createProductFactory(productRepository);
// const modifyProductById = modifyProductFactory(productRepository, shopRepository);
// const getUserPublicProfile = getUserDetailsFactory(logger, userRepository);
// const authenticateUserWithEmail = authenticateUserWithEmailFactory(
//     logger,
//     userRepository,
//     checkBcryptPassword,
// );
// const getUserListOfFollowedShops = getUserListOfFollowedShopsFactory(shopRepository);
//
// // Adapters - Controllers and middlewares
//
// const controllers: IAdapterControllers = {
//     api: {
//         getState: getApiStateControllerFactory(getApiState),
//     },
//     authentication: {
//         logIn: logInControllerFactory(serializeLoginKoaResponse),
//         logOut: logOutControllerFactory(serializeLogoutKoaResponse),
//     },
//     me: {
//         getPrivateSettings: getUserPublicProfileControllerFactory(
//             getUserPublicProfile,
//             deserializeGetUserPublicProfileKoaRequest,
//             serializeGetUserPublicProfileKoaResponse,
//         ), // TODO Replace bad controller
//         getUserListOfFollowedShops: getUserListOfFollowedShopsControllerFactory(
//             getUserListOfFollowedShops,
//         ),
//     },
//     products: {
//         createProduct: createProductControllerFactory(
//             createProduct,
//             shopRepository,
//             deserializeCreateProductKoaRequest,
//             serializeCreateProductKoaResponse,
//         ),
//         getProduct: getProductControllerFactory(productRepository),
//         modifyProduct: modifyProductControllerFactory(
//             modifyProductById,
//             deserializeModifyProductKoaRequest,
//             serializeModifyProductKoaResponse,
//         ),
//     },
//     shops: {
//         createShop: createShopControllerFactory(
//             createShop,
//             deserializeCreateShopKoaRequest,
//             serializeCreateShopKoaResponse,
//         ),
//         getShop: getShopControllerFactory(
//             getShop,
//             deserializeGetShopKoaRequest,
//             serializeGetShopKoaResponse,
//         ),
//     },
//     users: {
//         getPublicProfile: getUserPublicProfileControllerFactory(
//             getUserPublicProfile,
//             deserializeGetUserPublicProfileKoaRequest,
//             serializeGetUserPublicProfileKoaResponse,
//         ),
//     },
// };
//
// const middlewares: IAdapterMiddlewares = {
//     handleAuthenticatedUserMiddleware: handleAuthenticatedUserMiddlewareFactory(logger),
//     handleRequestErrorsMiddleware: handleRequestErrorsMiddlewareFactory(logger),
//     handleRequestTrackerMiddleware: handleRequestTrackerMiddlewareFactory(initTracker),
//     setResponseHeadersMiddleware: setResponseHeadersMiddlewareFactory(configuration),
// };
//
// const setupPassportStrategies = setupPassportStrategiesFactory(
//     [localPassportStrategyFactory(authenticateUserWithEmail)],
//     passportSerializer,
//     passportDeserializerFactory(userRepository),
// );
//
// // Web server
//
// const webserver = koaServerFactory(
//     controllers,
//     middlewares,
//     logger,
//     configuration,
//     setupPassportStrategies,
// );
