import { EventIdentifiers } from '@domain/tracker/events';
import { IConfiguration, IStrategy } from '@application/contracts';
import { ITrackerRepository } from '@domain/tracker/tracker-repository';

export type EventInMemory = {
    event: string;
    date: Date;
};

export const trackerRepositoryInMemoryFactory = (): ITrackerRepository &
    IStrategy => {
    const allEvents: EventInMemory[] = [];
    const pushEvent = (name: string) =>
        allEvents.push({
            date: new Date(),
            event: name,
        });

    const repository: ITrackerRepository = {
        exportEvents: () => allEvents,

        requestedCreateNewPayment: () =>
            pushEvent(EventIdentifiers.REQUESTED_CREATE_NEW_PAYMENT),
        requestedCreateNewProduct: () =>
            pushEvent(EventIdentifiers.REQUESTED_CREATE_NEW_PRODUCT),
        requestedGetApiState: () =>
            pushEvent(EventIdentifiers.REQUESTED_GET_API_STATE),

        start: () => pushEvent(EventIdentifiers.START),
        stop: () => pushEvent(EventIdentifiers.STOP),
    };

    return {
        ...repository,
        isApplicable: (environment: IConfiguration['ENVIRONMENT']) =>
            ['test'].includes(environment),
    };
};
