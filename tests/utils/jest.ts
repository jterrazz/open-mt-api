export const useFakeTimers = () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01').getTime());
};

export const useRealTimers = () => {
    jest.useRealTimers();
};
