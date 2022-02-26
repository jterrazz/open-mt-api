import { ITrackerRepository } from '@domain/tracker/tracker-repository';

export const createMockOfTrackerRepository = (): ITrackerRepository => {
    return {
        exportEvents: () => {},
        requestedCreateNewPayment: () => {},
        requestedCreateNewProduct: () => {},
        requestedGetApiState: () => {},
        start: () => {},
        stop: () => {},
    };
};
