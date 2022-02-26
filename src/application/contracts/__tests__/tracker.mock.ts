import { ITrackerRepository } from '@domain/tracker/tracker-repository';

export const createMockOfTrackerRepository = (): ITrackerRepository => {
    return {
        exportEvents: jest.fn(),
        requestedCreateNewPayment: jest.fn(),
        requestedCreateNewProduct: jest.fn(),
        requestedGetApiState: jest.fn(),
        start: jest.fn(),
        stop: jest.fn(),
    };
};
