import {
    IConfiguration,
    IDatabase,
    ILogger,
    IWebServer,
} from '@application/contracts';
import { IControllers } from '@adapters/controllers';
import { IMiddlewares } from '@adapters/middlewares';
import { ITrackerRepository } from '@domain/tracker/tracker-repository';
import { apiControllerFactory } from '@adapters/controllers/api-controller';
import { authenticateUserMiddlewareFactory } from '@adapters/middlewares/authenticate-user';
import { configurationFactory } from '@configuration/configuration';
import { handleRequestErrorsMiddlewareFactory } from '@adapters/middlewares/handle-request-errors';
import { initRequestTrackerMiddlewareFactory } from '@adapters/middlewares/init-request-tracker';
import { initTrackerForRequestFactory } from '@domain/tracker/init-tracker-for-request';
import { koaServerFactory } from '@infrastructure/webserver/koa-server';
import { paymentRepositoryPrismaFactory } from '@infrastructure/repositories/payment-repository-prisma';
import { prismaDatabaseFactory } from '@infrastructure/orm/prisma/prisma-database';
import { productRepositoryPrismaFactory } from '@infrastructure/repositories/product-repository-prisma';
import { shopControllerFactory } from '@adapters/controllers/shop-controller';
import { shopRepositoryPrismaFactory } from '@infrastructure/repositories/shop-repository-prisma';
import { trackerRepositoryInMemoryFactory } from '@infrastructure/repositories/tracker-repository-in-memory';
import { trackerRepositoryMixpanelFactory } from '@infrastructure/repositories/tracker-repository-mixpanel';
import { userControllerFactory } from '@adapters/controllers/user-controller';
import { userRepositoryPrismaFactory } from '@infrastructure/repositories/user-repository-prisma';
import { winstonLoggerFactory } from '@infrastructure/logger/winston/winston-logger';

export const initDependencies = (): {
    webserver: IWebServer;
    logger: ILogger;
    database: IDatabase;
    configuration: IConfiguration;
} => {
    const configuration = configurationFactory();
    const logger = winstonLoggerFactory(configuration);

    // Recreating this object would result in failure due to multiple Prisma clients
    // The global variable keeps one object on all unit tests
    const prismaDatabase =
        global.prismaDatabase || prismaDatabaseFactory(configuration, logger);
    global.prismaDatabase = prismaDatabase;

    // Dependencies

    const trackerRepository: ITrackerRepository | undefined = [
        trackerRepositoryMixpanelFactory(),
        trackerRepositoryInMemoryFactory(),
    ].find((strategy) => strategy.isApplicable(configuration.ENVIRONMENT));

    if (!trackerRepository) {
        throw new Error(
            `a tracker repository was not found for environment ${configuration.ENVIRONMENT}`,
        );
    }

    const initTracker = initTrackerForRequestFactory(trackerRepository);

    const paymentRepository = paymentRepositoryPrismaFactory(
        prismaDatabase.client,
    );
    const productRepository = productRepositoryPrismaFactory(
        prismaDatabase.client,
    );
    const shopRepository = shopRepositoryPrismaFactory(prismaDatabase.client);
    const userRepository = userRepositoryPrismaFactory(prismaDatabase.client);

    // Adapters - Controllers and middlewares

    const controllers: IControllers = {
        api: apiControllerFactory(configuration),
        shops: shopControllerFactory(shopRepository),
        users: userControllerFactory(logger, userRepository),
    };

    const middlewares: IMiddlewares = {
        authenticateUserMiddleware: authenticateUserMiddlewareFactory(logger),
        handleRequestErrorsMiddleware:
            handleRequestErrorsMiddlewareFactory(logger),
        initRequestTrackerMiddleware:
            initRequestTrackerMiddlewareFactory(initTracker),
    };

    // Web server

    const webserver = koaServerFactory(
        controllers,
        middlewares,
        logger,
        configuration,
    );

    return { configuration, database: prismaDatabase, logger, webserver };
};
