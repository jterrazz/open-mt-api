import { Prisma } from '@prisma/client';
import { mock } from 'jest-mock-extended';

import { prismaLoggerFactory } from '@application/database/prisma.logger';

import { Logger, LoggerLevel } from '@ports/logger';

describe('prismaLogger', () => {
    const mockLogger = mock<Logger>();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test.each<[Prisma.LogLevel, LoggerLevel]>([
        ['query', LoggerLevel.Debug],
        ['info', LoggerLevel.Info],
        ['warn', LoggerLevel.Warn],
        ['error', LoggerLevel.Error],
    ])('should call the correct logger method for log level %s', (level, loggerMethod) => {
        // Given
        const prismaLogger = prismaLoggerFactory(mockLogger);
        const message = `Test message for level: ${level}`;

        // When
        prismaLogger(level, message);

        // Then
        expect(mockLogger[loggerMethod]).toHaveBeenCalledWith(message);
    });
});
