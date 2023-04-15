import { applicationInjector } from '@application/injector';

const globalTeardown = async () => {
    const database = applicationInjector.resolve('database');

    await database.disconnect();
};

export default globalTeardown;
