import { IDatabase, IWebServer } from '@application/contracts';
import {
    createDatabase,
    dropDatabase,
    dropDatabaseConnections,
    migrateDatabase,
} from '@infrastructure/utils/database';
import { getDependencies } from '@configuration/dependencies';

export type EndToEndApplication = {
    webServerApplication: IWebServer['app'];
    database: IDatabase;
    destroy: () => Promise<void>;
};

export const createEndToEndApplication =
    async (): Promise<EndToEndApplication> => {
        const {
            webserver: { app },
            database,
            configuration,
        } = getDependencies();

        if (!configuration.DATABASE.GENERATED_DATABASE) {
            throw new Error('a randomly generated database is required');
        }

        await createDatabase(
            configuration.DATABASE.URL,
            configuration.DATABASE.GENERATED_DATABASE,
        );
        await migrateDatabase(configuration.DATABASE.URL);
        await database.connect();

        return {
            database,
            destroy: async () => {
                await dropDatabaseConnections(
                    database,
                    configuration.DATABASE.GENERATED_DATABASE as string,
                );
                await dropDatabase(
                    configuration.DATABASE.URL,
                    configuration.DATABASE.GENERATED_DATABASE as string,
                );
            },
            webServerApplication: app,
        };
    };
