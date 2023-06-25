import { useFakeTimers, useRealTimers } from '@tests/helpers/timer';

import { sleep } from '../sleep';

const simulateSleep = async (sleepDuration: number, advanceTimeBy: number) => {
    const sleepPromise = sleep(sleepDuration);
    const promiseResolved = jest.fn();

    void sleepPromise.then(promiseResolved); // eslint-disable-line promise/catch-or-return

    // Advance timers by the specified time
    jest.advanceTimersByTime(advanceTimeBy);

    // Allow pending promises to resolve or reject
    await Promise.resolve();

    return { promiseResolved };
};

beforeEach(async () => {
    useFakeTimers();
});

afterEach(() => {
    useRealTimers();
});

describe('sleep', () => {
    test('should resolve after the specified duration', async () => {
        // Given
        const duration = 1000;

        // When
        const { promiseResolved } = await simulateSleep(duration, duration + 10);

        // Then
        expect(promiseResolved).toHaveBeenCalledTimes(1);
    });

    test('should not resolve before the specified duration', async () => {
        // Given
        const duration = 1000;

        // When
        const { promiseResolved } = await simulateSleep(duration, duration - 10);

        // Then
        expect(promiseResolved).not.toHaveBeenCalled();
    });
});
