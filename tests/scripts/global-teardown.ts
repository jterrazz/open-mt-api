import { IPrismaDatabase } from '@infrastructure/orm/prisma/prisma-database';
import { Prisma } from '@prisma/client';
import { initDependencies } from '@configuration/dependencies';

/**
 * @warning Never activate this in production, as the database would be flushed
 */
const dangerouslyDropAllDatabaseRows = async (database: IPrismaDatabase) => {
    if (process.env.NODE_ENV !== 'test') {
        throw new Error(
            'this method should never be called in anything other than test environments',
        );
    }

    const modelNames = Prisma.dmmf.datamodel.models.map((model) => model.name);

    return Promise.all(
        modelNames.map((modelName) =>
            database[modelName.toLowerCase()].deleteMany(),
        ),
    );
};

module.exports = async () => {
    const { database, logger } = initDependencies();

    logger.info('ending all tests');
    logger.info('will drop all database data and disconnect');

    await dangerouslyDropAllDatabaseRows(database.client as IPrismaDatabase);
    await database.disconnect();
};
module.exports.dangerouslyDropAllDatabaseRows = dangerouslyDropAllDatabaseRows;
