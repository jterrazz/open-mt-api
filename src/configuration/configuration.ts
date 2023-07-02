import {
    ApplicationConfiguration,
    applicationConfigurationSchema,
} from '@configuration/schemas/application.schema';
import {
    EnvironmentConfiguration,
    environmentConfigurationSchema,
} from '@configuration/schemas/environment.schema';

export type Configuration = {
    APPLICATION: ApplicationConfiguration;
    ENVIRONMENT: EnvironmentConfiguration;
    // SERVICES: ServicesConfiguration;
};

export const configurationFactory = (environment: string): Configuration => {
    process.env.NODE_CONFIG_DIR = './src/configuration/values';

    const config = require('config'); // eslint-disable-line @typescript-eslint/no-var-requires
    const versionFromPackage = require('../../package.json').version; // eslint-disable-line @typescript-eslint/no-var-requires

    const applicationConfiguration = config.get('APPLICATION') as object;
    // const servicesConfiguration = config.get('SERVICES') as object;

    return {
        APPLICATION: applicationConfigurationSchema.parse({
            ...applicationConfiguration,
            VERSION: versionFromPackage,
        }),
        ENVIRONMENT: environmentConfigurationSchema.parse(environment),
        // SERVICES: servicesConfigurationSchema.parse(servicesConfiguration),
    };
};
