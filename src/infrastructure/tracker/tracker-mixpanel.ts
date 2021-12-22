import {
    IConfiguration,
    IStrategy,
    ITrackerFactory,
} from '@application/contracts';

export const mixpanelTrackerFactoryStrategy: IStrategy & ITrackerFactory =
    () => {
        return {
            events: {
                requested: {
                    createNewPayment: () => {},
                    createNewProduct: () => {},
                    getApiState: () => {},
                },
            },
            start: () => {},
            stop: () => {},
        };
    };

mixpanelTrackerFactoryStrategy.isApplicable = (
    environment: IConfiguration['ENVIRONMENT'],
) => environment !== 'test';
