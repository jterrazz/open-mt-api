import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const configuration = {
    globalSetup: '<rootDir>/tests/configuration/global-setup.ts',
    globalTeardown: '<rootDir>/tests/configuration/global-teardown.ts',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),
    testMatch: ['<rootDir>/(src|tests)/**/?(*.)+(spec|test).ts?(x)'],
    transform: {
        '^.+\\.(t|j)sx?$': '@swc/jest',
    },
};

export default configuration;
