import { IDatabase, IWebServer } from '@application/contracts';
import { getDependencies } from '@configuration/dependencies';

export type EndToEndApplication = {
    webServerApplication: IWebServer['app'];
    database: IDatabase;
};

export const createEndToEndApplication = (): EndToEndApplication => {
    // We initiate dependencies only at the global-setup step.
    // Recreating this object would result in failure due to multiple Prisma clients
    const { database, webserver } = getDependencies();

    return {
        database,
        webServerApplication: webserver.app,
    };
};
