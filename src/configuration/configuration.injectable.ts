import { Configuration, configurationFactory } from '@configuration/configuration';

export function injectableConfigurationFactory(environment: string): Configuration {
    return configurationFactory(environment);
}

injectableConfigurationFactory.inject = ['environment'] as const;
