import { dangerouslyDropAllDatabaseRows } from '@tests/utils/dangerously-drop-all-database-rows';
import { initDependencies } from '@configuration/dependencies';

module.exports = async () => {
    const { database, logger } = initDependencies();

    logger.info('ending all tests');
    logger.info('will drop all database data and disconnect');

    await dangerouslyDropAllDatabaseRows(database.client);
    await database.disconnect();
};
