const { pathsToModuleNameMapper } = require('ts-jest'); // eslint-disable-line
const { compilerOptions } = require('./tsconfig.json'); // eslint-disable-line

delete compilerOptions.paths['*'];

module.exports = {
    globalSetup: '<rootDir>/tests/setup/global-setup.ts',
    globalTeardown: '<rootDir>/tests/setup/global-teardown.ts',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/tests/setup/setup-files-after-env.ts'],
    testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
};
