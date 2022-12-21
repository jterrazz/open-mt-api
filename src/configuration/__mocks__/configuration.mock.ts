import { IConfiguration } from '~/domain';
import { configurationFactory } from '@configuration/configuration';

export const createMockOfConfiguration = (): IConfiguration => {
    return configurationFactory();
};
