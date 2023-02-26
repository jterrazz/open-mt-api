import { IAdapterControllers, IAdapterMiddlewares } from '../__legacy/src/adapters/types';
import { IConfiguration, ILogger, IWebServer } from '~/domain';
import {
    IPrismaDatabase,
    prismaDatabaseFactory,
} from '../__legacy/src/infra/orm/prisma/prisma-database';
import { authenticateUserWithEmailFactory } from '@domain/use-cases/authentication/authenticate-user-with-email';
import { checkBcryptPassword } from '@domain/utils/encryption/check-bcrypt-password';
import { configurationFactory } from '@configuration/configuration';
import { createProductControllerFactory } from '../__legacy/src/adapters/controllers/product/create-product.controller';
import { createProductFactory } from '@domain/use-cases/product/create-product';
import { createShopControllerFactory } from '../__legacy/src/adapters/controllers/shop/create-shop.controller';
import { createShopFactory } from '@domain/use-cases/shop/create-shop';
import { deserializeCreateProductKoaRequest } from '../__legacy/src/adapters/serializers/requests/product/deserialize-create-product-koa-request';
import { deserializeCreateShopKoaRequest } from '../__legacy/src/adapters/serializers/requests/shop/deserialize-create-shop-koa-request';
import { deserializeGetShopKoaRequest } from '../__legacy/src/adapters/serializers/requests/shop/deserialize-get-shop-koa-request';
import { deserializeGetUserPublicProfileKoaRequest } from '../__legacy/src/adapters/serializers/requests/user/deserialize-get-user-public-profile-koa-request';
import { deserializeModifyProductKoaRequest } from '../__legacy/src/adapters/serializers/requests/product/deserialize-modify-product-koa-request';
import { getApiStateControllerFactory } from '../__legacy/src/adapters/controllers/api/get-api-state.controller';
import { getApiStateFactory } from '@domain/use-cases/api/get-api-state';
import { getProductControllerFactory } from '../__legacy/src/adapters/controllers/product/get-product.controller';
import { getShopControllerFactory } from '../__legacy/src/adapters/controllers/shop/get-shop.controller';
import { getShopFactory } from '@domain/use-cases/shop/get-shop';
import { getUserDetailsFactory } from '@domain/use-cases/user/get-user-details';
import { getUserListOfFollowedShopsControllerFactory } from '../__legacy/src/adapters/controllers/me/get-user-followed-shops.controller';
import { getUserListOfFollowedShopsFactory } from '@domain/use-cases/user/get-user-list-of-followed-shops';
import { getUserPublicProfileControllerFactory } from '../__legacy/src/adapters/controllers/user/get-user-public-profile.controller';
import { handleAuthenticatedUserMiddlewareFactory } from '../__legacy/src/adapters/middlewares/handle-authenticated-user.middleware';
import { handleRequestErrorsMiddlewareFactory } from '../__legacy/src/adapters/middlewares/handle-request-errors.middleware';
import { handleRequestTrackerMiddlewareFactory } from '../__legacy/src/adapters/middlewares/handle-request-tracker.middleware';
import { initTrackerForRequestInMemoryFactory } from '../__legacy/src/infra/tracker/init-tracker-for-request.in-memory';
import { initTrackerForRequestMixpanelFactory } from '../__legacy/src/infra/tracker/init-tracker-for-request.mixpanel';
import { koaServerFactory } from '@application/server/koa-server';
import { localPassportStrategyFactory } from '../__legacy/src/adapters/middlewares/passport/local.passport-strategy';
import { logInControllerFactory } from '../__legacy/src/adapters/controllers/authentication/log-in.controller';
import { logOutControllerFactory } from '../__legacy/src/adapters/controllers/authentication/log-out.controller';
import { modifyProductControllerFactory } from '../__legacy/src/adapters/controllers/product/modify-product.controller';
import { modifyProductFactory } from '@domain/use-cases/product/modify-product';
import { passportDeserializerFactory } from '../__legacy/src/adapters/serializers/authentication/passport-deserializer';
import { passportSerializer } from '../__legacy/src/adapters/serializers/authentication/passport-serializer';
import { productRepositoryPrismaFactory } from '../__legacy/src/infra/repositories/product.prisma-repository';
import { serializeCreateProductKoaResponse } from '../__legacy/src/adapters/serializers/requests/product/serialize-create-product-koa-response';
import { serializeCreateShopKoaResponse } from '../__legacy/src/adapters/serializers/requests/shop/serialize-create-shop-koa-response';
import { serializeGetShopKoaResponse } from '../__legacy/src/adapters/serializers/requests/shop/serialize-get-shop-koa-response';
import { serializeGetUserPublicProfileKoaResponse } from '../__legacy/src/adapters/serializers/requests/user/serialize-get-user-public-profile-koa-response';
import { serializeLoginKoaResponse } from '../__legacy/src/adapters/serializers/requests/authentication/serialize-login-koa-response';
import { serializeLogoutKoaResponse } from '../__legacy/src/adapters/serializers/requests/authentication/serialize-logout-koa-response';
import { serializeModifyProductKoaResponse } from '../__legacy/src/adapters/serializers/requests/product/serialize-modify-product-koa-response';
import { setResponseHeadersMiddlewareFactory } from '../__legacy/src/adapters/middlewares/set-response-headers.middleware';
import { setupPassportStrategiesFactory } from '@application/server/setup-passport-strategies';
import { shopRepositoryPrismaFactory } from '../__legacy/src/infra/repositories/shop.prisma-repository';
import { userRepositoryPrismaFactory } from '../__legacy/src/infra/repositories/user.prisma-repository';
import { winstonLoggerFactory } from '../__legacy/src/infra/logger/winston-logger';

export const getDependencies = (): {
    webserver: IWebServer;
    logger: ILogger;
    database: IPrismaDatabase;
    configuration: IConfiguration;
} => {
    const configuration = configurationFactory();
    const logger = winstonLoggerFactory(configuration);
    const prismaDatabase = prismaDatabaseFactory(configuration, logger);

    // Domain

    const initTrackerFactory = [
        initTrackerForRequestMixpanelFactory,
        initTrackerForRequestInMemoryFactory,
    ].find((strategy) => strategy.isApplicable(configuration));

    if (!initTrackerFactory) {
        throw new Error(
            `a tracker repository was not found for environment ${configuration.ENVIRONMENT}`,
        );
    }

    const initTracker = initTrackerFactory.factory(configuration);

    const productRepository = productRepositoryPrismaFactory(prismaDatabase.client);
    const shopRepository = shopRepositoryPrismaFactory(prismaDatabase.client);
    const userRepository = userRepositoryPrismaFactory(prismaDatabase.client);

    // Use cases

    const getApiState = getApiStateFactory(configuration);
    const createShop = createShopFactory(shopRepository);
    const getShop = getShopFactory(shopRepository);
    const createProduct = createProductFactory(productRepository);
    const modifyProductById = modifyProductFactory(productRepository, shopRepository);
    const getUserPublicProfile = getUserDetailsFactory(logger, userRepository);
    const authenticateUserWithEmail = authenticateUserWithEmailFactory(
        logger,
        userRepository,
        checkBcryptPassword,
    );
    const getUserListOfFollowedShops = getUserListOfFollowedShopsFactory(shopRepository);

    // Adapters - Controllers and middlewares

    const controllers: IAdapterControllers = {
        api: {
            getState: getApiStateControllerFactory(getApiState),
        },
        authentication: {
            logIn: logInControllerFactory(serializeLoginKoaResponse),
            logOut: logOutControllerFactory(serializeLogoutKoaResponse),
        },
        me: {
            getPrivateSettings: getUserPublicProfileControllerFactory(
                getUserPublicProfile,
                deserializeGetUserPublicProfileKoaRequest,
                serializeGetUserPublicProfileKoaResponse,
            ), // TODO Replace bad controller
            getUserListOfFollowedShops: getUserListOfFollowedShopsControllerFactory(
                getUserListOfFollowedShops,
            ),
        },
        products: {
            createProduct: createProductControllerFactory(
                createProduct,
                shopRepository,
                deserializeCreateProductKoaRequest,
                serializeCreateProductKoaResponse,
            ),
            getProduct: getProductControllerFactory(productRepository),
            modifyProduct: modifyProductControllerFactory(
                modifyProductById,
                deserializeModifyProductKoaRequest,
                serializeModifyProductKoaResponse,
            ),
        },
        shops: {
            createShop: createShopControllerFactory(
                createShop,
                deserializeCreateShopKoaRequest,
                serializeCreateShopKoaResponse,
            ),
            getShop: getShopControllerFactory(
                getShop,
                deserializeGetShopKoaRequest,
                serializeGetShopKoaResponse,
            ),
        },
        users: {
            getPublicProfile: getUserPublicProfileControllerFactory(
                getUserPublicProfile,
                deserializeGetUserPublicProfileKoaRequest,
                serializeGetUserPublicProfileKoaResponse,
            ),
        },
    };

    const middlewares: IAdapterMiddlewares = {
        handleAuthenticatedUserMiddleware: handleAuthenticatedUserMiddlewareFactory(logger),
        handleRequestErrorsMiddleware: handleRequestErrorsMiddlewareFactory(logger),
        handleRequestTrackerMiddleware: handleRequestTrackerMiddlewareFactory(initTracker),
        setResponseHeadersMiddleware: setResponseHeadersMiddlewareFactory(configuration),
    };

    const setupPassportStrategies = setupPassportStrategiesFactory(
        [localPassportStrategyFactory(authenticateUserWithEmail)],
        passportSerializer,
        passportDeserializerFactory(userRepository),
    );

    // Web server

    const webserver = koaServerFactory(
        controllers,
        middlewares,
        logger,
        configuration,
        setupPassportStrategies,
    );

    return { configuration, database: prismaDatabase, logger, webserver };
};
