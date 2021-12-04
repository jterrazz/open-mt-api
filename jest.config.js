// eslint-disable-next-line @typescript-eslint/no-var-requires
const { pathsToModuleNameMapper } = require('ts-jest/utils');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compilerOptions } = require('./tsconfig.json');

delete compilerOptions.paths['*'];

module.exports = {
    collectCoverageFrom: ['src/**/*.{ts,js}'],
    coverageReporters: ['text', 'text-summary'],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0,
        },
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),
    // setupFiles: ['<rootDir>/src/tests/setup/setup.ts'],
    testEnvironment: 'node',
    testPathIgnorePatterns: [
        '/node_modules/',
        '/build/',
        '/coverage/',
        '/scripts/',
    ],
    testRegex: '((\\.|/)(test|spec))\\.(js|ts)x?$',
    transform: {
        '\\.ts$': 'ts-jest',
    },
};
