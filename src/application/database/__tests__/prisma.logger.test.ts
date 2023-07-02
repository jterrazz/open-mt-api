import { Prisma } from '@prisma/client';
import { mock } from 'jest-mock-extended';

import { prismaLoggerFactory } from '@application/database/prisma.logger';

import { Logger } from '@ports/logger';

describe('prismaLogger', () => {
    const mockOfLogger = mock<Logger>();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test.each<[Prisma.LogLevel, keyof Logger]>([
        ['query', 'debug'],
        ['info', 'info'],
        ['warn', 'warn'],
        ['error', 'error'],
    ])('should call the correct logger method for log level %s', (level, loggerMethod) => {
        // Given
        const prismaLogger = prismaLoggerFactory(mockOfLogger);
        const message = `Test message for level: ${level}`;

        // When
        prismaLogger(level, message);

        // Then
        expect(mockOfLogger[loggerMethod]).toHaveBeenCalledWith(message);
    });
});
