import {
    ApplicationConfiguration,
    applicationConfigurationSchema,
} from '@configuration/schemas/application';
import {
    Environment,
    EnvironmentConfiguration,
    environmentConfigurationSchema,
} from '@configuration/schemas/environment';
import {
    ServicesConfiguration,
    servicesConfigurationSchema,
} from '@configuration/schemas/services';

export type Configuration = {
    APPLICATION: ApplicationConfiguration;
    ENVIRONMENT: EnvironmentConfiguration;
    SERVICES: ServicesConfiguration;
};

export const configurationFactory = (
    nodeEnv: string = process.env.NODE_ENV || Environment.DEVELOPMENT,
): Configuration => {
    process.env.NODE_CONFIG_DIR = './src/configuration/values';

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config = require('config');

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const versionFromPackage = require('../../package.json').version;

    const applicationConfiguration = config.get('APPLICATION') as object;
    const servicesConfiguration = config.get('SERVICES') as object;

    return {
        APPLICATION: applicationConfigurationSchema.parse({
            ...applicationConfiguration,
            VERSION: versionFromPackage,
        }),
        ENVIRONMENT: environmentConfigurationSchema.parse(nodeEnv),
        SERVICES: servicesConfigurationSchema.parse(servicesConfiguration),
    };
};
