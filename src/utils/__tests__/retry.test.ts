import { useFakeTimers, useRealTimers } from '@tests/helpers/timer';

import { retry } from '../retry';

// Helper function to create a mock function that resolves after n tries
const createMockOfResolvingFn = (resolveValue: unknown, tries: number) => {
    let attempts = 0;
    return async () => {
        attempts++;
        if (attempts < tries) {
            throw new Error(`Failed on attempt ${attempts}`);
        }
        return resolveValue;
    };
};

beforeEach(async () => {
    useFakeTimers();
});

afterEach(() => {
    useRealTimers();
});

describe('retry', () => {
    test('should resolve immediately if function succeeds on the first try', async () => {
        // Given
        const fn = jest.fn(async () => 'success');

        // When
        const result = await retry(fn);

        // Then
        expect(result).toBe('success');
        expect(fn).toHaveBeenCalledTimes(1);
    });

    test('should resolve after a few tries if function eventually succeeds', async () => {
        // Given
        const fn = createMockOfResolvingFn('success', 3);

        // When
        const result = retry(fn, { tries: 5 });
        jest.advanceTimersByTime(10_000);

        // Then
        setImmediate(async () => {
            await expect(result).resolves.toBe('success');
        });
    });

    test('should reject if function always fails within the given tries', async () => {
        // Given
        const fn = jest.fn(async () => {
            throw new Error('failure');
        });

        // When
        const resultPromise = retry(fn, { tries: 3 });
        jest.advanceTimersByTime(10_000);

        // Then
        setImmediate(async () => {
            await expect(resultPromise).rejects.toEqual(new Error('failure'));
            expect(fn).toHaveBeenCalledTimes(3);
        });
    });

    test('should call onError for each failed attempt', async () => {
        // Given
        const fn = createMockOfResolvingFn('success', 3);
        const onError = jest.fn();

        // When
        const resultPromise = retry(fn, { onError, tries: 5 });
        jest.advanceTimersByTime(10_000);

        // Then
        setImmediate(async () => {
            await expect(resultPromise).resolves.toBe('success');
            expect(onError).toHaveBeenCalledTimes(2);
        });
    });
});
