import { IProjectDependencies } from '@application/contracts/IProjectDependencies';
import { IWebServer } from '@application/contracts/IWebServer';
import { getProjectDependencies } from '~/configuration/project-dependencies';

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
