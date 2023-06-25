import { applicationInjector } from '@application/injector';

import { apiFactory } from './api';

export const startApi = async () => {
    const logger = applicationInjector.resolve('logger');

    const api = apiFactory(
        applicationInjector.resolve('configuration'),
        logger,
        applicationInjector.resolve('database'),
        applicationInjector.resolve('server'),
    );

    try {
        await api.start();
    } catch (error) {
        logger.error(error);
    }
};

startApi().then(); // eslint-disable-line promise/catch-or-return,promise/valid-params
