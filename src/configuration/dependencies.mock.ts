import { IDependencies, IWebServer } from '@application/contracts';
import { getDependencies } from '@configuration/dependencies';

export const createMockOfDependencies = (): {
    webserver: IWebServer;
} & IDependencies => {
    // Override mocked values if needed

    return getDependencies();
};
