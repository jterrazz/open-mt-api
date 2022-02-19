// eslint-disable-next-line @typescript-eslint/no-var-requires
const { pathsToModuleNameMapper } = require('ts-jest/utils');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compilerOptions } = require('./tsconfig.json');

delete compilerOptions.paths['*'];

module.exports = {
    globalSetup: '<rootDir>/tests/scripts/global-setup.ts',
    globalTeardown: '<rootDir>/tests/scripts/global-teardown.ts',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/tests/scripts/setup-files-after-env.ts'],
};
