import { IControllers } from '@adapters';
import { IProjectDependencies, IWebServer } from '@application/contracts';
import { apiControllerFactory } from '@adapters/controllers/api.controller';
import { configurationFactory } from '@configuration/configuration';
import { koaServerFactory } from '@infrastructure/webserver/koa-server';
import { loggerFactory } from '@infrastructure/logger/winston/winston-logger';
import { mixpanelTrackerFactoryStrategy } from '@infrastructure/tracker/tracker-mixpanel';
import { paymentRepositoryPrismaFactory } from '@infrastructure/repositories/payment-repository-prisma';
import { prismaDatabaseFactory } from '@infrastructure/orm/prisma/prisma-database';
import { productRepositoryPrisma } from '@infrastructure/repositories/product-repository-prisma';
import { shopRepositoryPrismaFactory } from '@infrastructure/repositories/shop-repository-prisma';
import { shopsControllerFactory } from '@adapters/controllers/shops.controller';
import { trackerInMemoryFactory } from '@infrastructure/tracker/tracker-in-memory';
import { userRepositoryPrismaFactory } from '@infrastructure/repositories/user-repository-prisma';
import { usersControllerFactory } from '@adapters/controllers/users.controller';

export const getProjectDependencies = (): {
    dependencies: IProjectDependencies;
    webserver: IWebServer;
} => {
    const configuration = configurationFactory();
    const logger = loggerFactory(configuration);
    const database = prismaDatabaseFactory(configuration, logger);

    // Dependencies

    const trackerFactory = [
        mixpanelTrackerFactoryStrategy,
        trackerInMemoryFactory,
    ].find((strategy) => strategy.isApplicable(configuration.ENVIRONMENT));

    if (!trackerFactory) {
        throw new Error('a tracker dependency was not found');
    }

    const dependencies: IProjectDependencies = {
        configuration,
        database,
        logger,
        repositories: {
            paymentRepository: paymentRepositoryPrismaFactory(database),
            productRepository: productRepositoryPrisma(),
            shopRepository: shopRepositoryPrismaFactory(database),
            userRepository: userRepositoryPrismaFactory(database),
        },
        trackerFactory,
    };

    // Controllers

    const controllers: IControllers = {
        api: apiControllerFactory(dependencies),
        shops: shopsControllerFactory(dependencies),
        users: usersControllerFactory(dependencies),
    };

    // Web server

    const webserver = koaServerFactory(dependencies, controllers);

    return { dependencies, webserver };
};
