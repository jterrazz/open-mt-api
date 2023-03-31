import { Configuration } from '@configuration/configuration';

import { Database } from '@ports/database';
import { Logger } from '@ports/logger';
import { Server } from '@ports/server';

import { retry } from '@utils/retry';

interface Application {
    start: () => Promise<void>;
}

export const applicationFactory = (
    configuration: Configuration,
    logger: Logger,
    database: Database,
    server: Server,
): Application => {
    return {
        start: async () => {
            logger.info(`application is starting with environment: ${configuration.ENVIRONMENT}`);

            await retry(() => database.connect(), {
                delay: 500,
                onError: (error) => {
                    logger.error('failed to connect to database, will try again in 500 ms');
                    logger.error(error.message);
                },
                tries: 20,
            });

            await server.start(configuration.APPLICATION.SERVER.PORT);

            logger.info(`application started`);
        },
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
