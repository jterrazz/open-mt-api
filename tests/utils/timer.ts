const SYSTEM_TIME = new Date('2000-01-01T00:00:00.000Z').getTime();

export const useFakeTimers = () => {
    jest.useFakeTimers().setSystemTime(SYSTEM_TIME);
};

export const useRealTimers = () => {
    jest.useRealTimers();
};
