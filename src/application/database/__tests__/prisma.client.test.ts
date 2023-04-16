import { PrismaClient } from '@prisma/client';

import { prismaClientFactory } from '@application/database/prisma.client';
import { PrismaLogger } from '@application/database/prisma.logger';

let prismaEventHandlers: Record<string, CallableFunction> = {};

jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn(() => ({
        $on: jest.fn((event, callback) => {
            prismaEventHandlers[event] = callback;
        }),
    })),
}));

beforeEach(() => {
    jest.clearAllMocks();
    prismaEventHandlers = {};
});

describe('prismaClient', () => {
    const databaseUrl = 'the-database-url';
    const prismaLogger: PrismaLogger = jest.fn();

    test('should create a new PrismaClient instance with the provided database URL', () => {
        // Given - When
        prismaClientFactory(databaseUrl, prismaLogger);

        // Then
        expect(process.env['DATABASE_URL']).toBe(databaseUrl);
        expect(PrismaClient).toHaveBeenCalledTimes(1);
    });

    test.each(['info', 'warn', 'error'])(
        'should call the provided logger with the correct level and message when an <%s> event is emitted',
        (level) => {
            // Given
            const message = 'the-message';
            prismaClientFactory(databaseUrl, prismaLogger);

            // When
            prismaEventHandlers[level]({ message, query: message });

            // Then
            expect(prismaLogger).toHaveBeenCalledWith(level, message);
        },
    );

    test('should call the provided logger with the correct level and message when an <%s> event is emitted', () => {
        // Given
        const query = 'the-query';
        prismaClientFactory(databaseUrl, prismaLogger);

        // When
        prismaEventHandlers.query({ query });

        // Then
        expect(prismaLogger).toHaveBeenCalledWith('query', query);
    });
});
