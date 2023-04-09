import { applicationInjector } from '@application/injector';
import { applicationFactory } from './application';

export const start = async () => {
    const logger = applicationInjector.resolve('logger');

    const application = applicationFactory(
        applicationInjector.resolve('configuration'),
        logger,
        applicationInjector.resolve('database'),
        applicationInjector.resolve('server'),
    );

    try {
        await application.start();
    } catch (error) {
        logger.error(error);
    }
};

// eslint-disable-next-line promise/catch-or-return,promise/valid-params
start().then();
