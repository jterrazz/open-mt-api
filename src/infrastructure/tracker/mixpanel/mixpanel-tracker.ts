import { ITrackerService } from '@application/contracts/ITrackerService';

export const mixpanelTrackerFactory = (): ITrackerService => {
    return {
        events: {
            requested: {
                createNewPayment: () => {},
                getApiState: () => {},
            },
        },
        start: () => {},
        stop: () => {},
    };
};
