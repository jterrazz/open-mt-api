import { IProjectDependencies, IWebServer } from '@application/contracts';
import { getProjectDependencies } from '@configuration/project-dependencies';

export const createMockProjectDependencies = (): {
    dependencies: IProjectDependencies;
    webserver: IWebServer;
} => {
    const { dependencies, webserver } = getProjectDependencies();

    return {
        dependencies,
        webserver,
    };
};
