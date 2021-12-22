import { ITracker } from '.';

export const createMockTracker = (): ITracker => {
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
