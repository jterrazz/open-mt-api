import { IPrismaDatabase } from '@infrastructure/orm/prisma/prisma-database';
import { Prisma } from '@prisma/client';
import { getDependencies } from '@configuration/dependencies';

// @warning
// Never activate this in production as the database would be
// @todo make unit test that this function is not triggered in production
// And isolate this function to do so !!!

const dropAllDatabaseRows = async (database: IPrismaDatabase) => {
    const modelNames = Prisma.dmmf.datamodel.models.map((model) => model.name);

    return Promise.all(
        modelNames.map((modelName) =>
            database[modelName.toLowerCase()].deleteMany(),
        ),
    );
};

module.exports = async () => {
    const { database, logger } = getDependencies();

    logger.info('tests teardown - database');
    await dropAllDatabaseRows(database.client as IPrismaDatabase);
    await database.disconnect();
};
