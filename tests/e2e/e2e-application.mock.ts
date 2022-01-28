import { IWebServer } from '@application/contracts';
import { getDependencies } from '@configuration/dependencies';

export const createEndToEndApplication = async (): Promise<
    IWebServer['app']
> => {
    const {
        webserver: { app },
        database,
    } = getDependencies();

    await database.connect();

    return app;
};
