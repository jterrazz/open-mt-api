require('tsconfig-paths/register');

import { dangerouslyDropAllDatabaseRows } from '@tests/utils/dangerously-drop-all-database-rows';
import { initDependencies } from '@configuration/dependencies';

module.exports = async () => {
    const { database, logger } = initDependencies();

    logger.info('connecting to test database');
    await database.connect();
    logger.info('connected to test database');
    await dangerouslyDropAllDatabaseRows(database.client);
};
