import 'dotenv/config.js';
import {
    IConfiguration,
    apiConfigSchema,
    databaseConfigSchema,
    environmentSchema,
    logConfigSchema,
} from '@application/contracts/configuration'; // .yml configuration
import config from 'config';

export const configurationFactory = (
    nodeEnv = process.env.NODE_ENV,
): IConfiguration => {
    const ENVIRONMENT = environmentSchema.parse(nodeEnv);
    const API = apiConfigSchema.parse(config.get('API'));
    const LOG = logConfigSchema.parse(config.get('LOG'));
    const DATABASE = databaseConfigSchema.parse(config.get('DATABASE'));

    return {
        API,
        DATABASE,
        ENVIRONMENT,
        LOG,
    };
};
