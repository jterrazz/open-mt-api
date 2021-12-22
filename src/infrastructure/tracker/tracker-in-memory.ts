import { Events } from '@domain/tracker/events';
import {
    IConfiguration,
    IStrategy,
    ITrackerFactory,
    TrackerEvent,
} from '@application/contracts';

export const trackerInMemoryFactory: IStrategy & ITrackerFactory = () => {
    const allEvents: TrackerEvent[] = [];

    const pushEvent = (name: string) =>
        allEvents.push({
            date: new Date(),
            name,
        });

    return {
        events: {
            requested: {
                createNewPayment: () =>
                    pushEvent(Events.REQUESTED_CREATE_NEW_PAYMENT),
                createNewProduct: () =>
                    pushEvent(Events.REQUESTED_CREATE_NEW_PRODUCT),
                getApiState: () => pushEvent(Events.REQUESTED_GET_API_STATE),
            },
        },
        exportResult: () => allEvents,
        start: () => pushEvent(Events.START),
        stop: () => pushEvent(Events.STOP),
    };
};

trackerInMemoryFactory.isApplicable = (
    environment: IConfiguration['ENVIRONMENT'],
) => ['test'].includes(environment);
