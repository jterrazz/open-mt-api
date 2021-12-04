import { ITrackerService } from '@application/contracts/ITrackerService';

export const createMockTracker = (): ITrackerService => {
    return {
        events: {
            requested: {
                createNewPayment: () => {},
                getApiState: () => {},
            },
        },
        start() {},
        stop() {},
    };
};
