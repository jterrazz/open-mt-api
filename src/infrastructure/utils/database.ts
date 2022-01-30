import * as pgtools from 'pgtools';
import * as util from 'util';
import { IDatabase } from '@application/contracts';
import { exec } from 'child_process';

const execAsync = util.promisify(exec);

export async function createDatabase(connectionString: string, name: string) {
    return new Promise<void>((resolve, reject) => {
        pgtools.createdb(connectionString, name, async function (err, res) {
            if (err) {
                reject(err);
            }

            console.log('created new database');
            resolve();
        });
    });
}

export async function dropDatabase(connectionString: string, name: string) {
    return new Promise<void>((resolve, reject) => {
        pgtools.dropdb(connectionString, name, async function (err, res) {
            if (err) {
                console.log(err);
                reject(err);
            }

            console.log('dropped new database');
            resolve();
        });
    });
}

export async function migrateDatabase(connectionString: string) {
    const { stdout, stderr } = await execAsync(
        `DATABASE_URL=${connectionString} yarn db:migrate-deploy`,
    );

    if (stderr) {
        throw new Error(stderr);
    } else if (!/All migrations have been successfully applied/.test(stdout)) {
        throw new Error('Migrations were not applied to database');
    }
}

export async function dropDatabaseConnections(
    database: IDatabase,
    databaseName: string,
) {
    const cmd = `select pg_terminate_backend(pid) from pg_stat_activity where datname='${databaseName}';`;

    await database.client
        .$executeRawUnsafe(cmd)
        .catch((err) => console.log(err));
}
