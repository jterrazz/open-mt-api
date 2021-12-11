import { getProjectDependencies } from '~/configuration/project-dependencies';

export const startApplication = async () => {
    const { dependencies, webserver } = getProjectDependencies();
    const {
        logger,
        configuration: { ENVIRONMENT },
        database,
    } = dependencies;

    logger.info(`app is starting with environment: ${ENVIRONMENT}`);

    try {
        await database.connect();
        await webserver.start();
    } catch (e) {
        logger.error(e);
    }
};

startApplication().then();
