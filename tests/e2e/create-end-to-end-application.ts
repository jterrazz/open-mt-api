import { IPrismaDatabase } from '@infrastructure/orm/prisma/prisma-database';
import { IWebServer } from '@application/contracts';
import { getDependencies } from '@configuration/dependencies';

export type CreateEndToEndApplication = {
    app: IWebServer['app'];
    database: IPrismaDatabase;
};

export const createEndToEndApplication = (): CreateEndToEndApplication => {
    const { database, webserver } = getDependencies();

    return {
        app: webserver.app,
        database: database as IPrismaDatabase,
    };
};
