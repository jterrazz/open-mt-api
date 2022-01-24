import { ITracker } from '.';

export const createMockOfTracker = (): ITracker => {
    return {
        events: {
            requested: {
                createNewPayment: () => {},
                createNewProduct: () => {},
                getApiState: () => {},
            },
        },
        start() {},
        stop() {},
    };
};
