import { initDependencies } from '@configuration/dependencies';

export const startApplication = async () => {
    const {
        logger,
        configuration: { ENVIRONMENT },
        database,
        webserver,
    } = initDependencies();

    logger.info(`app is starting with environment: ${ENVIRONMENT}`);

    try {
        await database.connect();
        await webserver.start();
    } catch (e) {
        logger.error(e);
    }
};

startApplication().then();
