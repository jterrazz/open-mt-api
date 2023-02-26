import { Configuration, configurationFactory } from '@configuration/configuration';

export const createMockOfConfiguration = (): Configuration => {
    return configurationFactory();
};
