require('tsconfig-paths/register');

import { getDependencies } from '@configuration/dependencies';

module.exports = async () => {
    const { database, logger } = getDependencies();

    logger.info('connecting to test database');
    await database.connect();
    logger.info('connected to test database');
};
