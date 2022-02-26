export const useFakeTimers = () => {
    jest.useFakeTimers().setSystemTime(new Date('2000-01-01').getTime());
};

export const useRealTimers = () => {
    jest.useRealTimers();
};
