import { trackerInMemoryFactory } from '@infrastructure/tracker/tracker-in-memory';

describe('tracker in memory', function () {
    it('should track events', function () {
        // Given
        const tracker = trackerInMemoryFactory();

        // When
        jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
        tracker.start();
        jest.setSystemTime(new Date('2020-01-02'));
        tracker.events.requested.getApiState();
        jest.setSystemTime(new Date('2020-01-03'));
        tracker.stop();
        jest.useRealTimers();

        // Then
        const result = tracker.exportResult && tracker.exportResult();
        expect(result).toEqual([
            { date: new Date('2020-01-01'), name: 'start' },
            { date: new Date('2020-01-02'), name: 'requested_get_api_state' },
            { date: new Date('2020-01-03'), name: 'stop' },
        ]);
    });
});
