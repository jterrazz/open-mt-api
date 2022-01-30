import 'dotenv/config.js';
import {
    IConfiguration,
    apiConfigSchema,
    databaseConfigSchema,
    environmentSchema,
    logConfigSchema,
} from '@application/contracts/configuration';
import config from 'config'; // .yml configuration
const pgConnectionString = require('pg-connection-string');

const replaceConnectionStringWithRandomDatabaseFactory = (databaseSettings) => {
    const strategy = () => {
        databaseSettings.GENERATED_DATABASE = Math.random()
            .toString(36)
            .substr(2, 5);

        const { user, password, port, host } = pgConnectionString.parse(
            databaseSettings.URL,
        );

        databaseSettings.URL = `postgresql://${user}:${password}@${host}:${port}/${databaseSettings.GENERATED_DATABASE}?schema=${databaseSettings.GENERATED_DATABASE}`;
    };

    strategy.isApplicable = (environment: IConfiguration['ENVIRONMENT']) =>
        ['test'].includes(environment);

    return strategy;
};

export const configurationFactory = (): IConfiguration => {
    const ENVIRONMENT = environmentSchema.parse(process.env.NODE_ENV);
    const API = apiConfigSchema.parse(config.get('API'));
    const LOG = logConfigSchema.parse(config.get('LOG'));
    const DATABASE = databaseConfigSchema.parse(config.get('DATABASE'));

    [replaceConnectionStringWithRandomDatabaseFactory(DATABASE)]
        .filter((strategy) => strategy.isApplicable(ENVIRONMENT))
        .map((strategy) => strategy());

    console.log('DATABASE');
    console.log('DATABASE');
    console.log('DATABASE');
    console.log(DATABASE);

    return {
        API,
        DATABASE,
        ENVIRONMENT,
        LOG,
    };
};
