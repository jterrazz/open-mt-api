import { applicationInjector } from '@application/injector';

export const databaseContextFactory = () => {
    return applicationInjector.resolve('database');
};
