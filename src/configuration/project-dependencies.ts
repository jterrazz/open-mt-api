import { IControllers } from '@adapters/controllers/IControllers';
import { IProjectDependencies } from '@application/contracts/IProjectDependencies';
import { IWebServer } from '@application/contracts/IWebServer';
import { PaymentServiceValidationMethod } from '@application/contracts/IPaymentService';
import { apiControllerFactory } from '@adapters/controllers/api.controller';
import { configurationFactory } from '@configuration/configuration';
import { koaServerFactory } from '@infrastructure/webserver/koa-server';
import { loggerFactory } from '@infrastructure/logger/winston/winston-logger';
import { mixpanelTrackerFactory } from '@infrastructure/tracker/mixpanel/mixpanel-tracker';
import { paymentRepositoryPrismaFactory } from '@infrastructure/repositories/payment-repository-prisma';
import { paymentsControllerFactory } from '@adapters/controllers/payments.controller';
import { prismaDatabaseFactory } from '@infrastructure/orm/prisma/prisma-database';
import { userRepositoryPrismaFactory } from '@infrastructure/repositories/user-repository-prisma';
import { usersControllerFactory } from '@adapters/controllers/users.controller';

export const getProjectDependencies = (): {
    dependencies: IProjectDependencies;
    webserver: IWebServer;
} => {
    const configuration = configurationFactory();
    const logger = loggerFactory(configuration);
    const database = prismaDatabaseFactory(configuration, logger);

    /**
     * Dependencies
     */

    const dependencies: IProjectDependencies = {
        configuration,
        database,
        logger,
        paymentService: {
            async initiatePayment() {
                // Dump mock now
                return {
                    validationMethod: PaymentServiceValidationMethod.Webview,
                    validationUrl: 'PaymentServiceValidationMethod.Webview',
                };
            },
        },
        repositories: {
            paymentRepository: paymentRepositoryPrismaFactory(database),
            userRepository: userRepositoryPrismaFactory(database),
        },
        trackerFactory: mixpanelTrackerFactory,
    };

    /**
     * Controllers
     */

    const controllers: IControllers = {
        api: apiControllerFactory(dependencies),
        payments: paymentsControllerFactory(dependencies),
        users: usersControllerFactory(dependencies),
    };

    /**
     * Web server
     */

    const webserver = koaServerFactory(dependencies, controllers);

    return { dependencies, webserver };
};
