import { Applicable } from '@application/../../domain/utils/applicable';

import { EventIdentifiers } from '@domain/../../domain/use-cases/tracker/events';
import { ITrackerRepository } from '@domain/../../domain/use-cases/tracker/tracker.repository';
import { IConfiguration } from '~/domain';

export type EventInMemory = {
    event: string;
    date: Date;
};

export const trackerRepositoryInMemoryFactory = (): ITrackerRepository => {
    const allEvents: EventInMemory[] = [];
    const pushEvent = (name: string) =>
        allEvents.push({
            date: new Date(),
            event: name,
        });

    return {
        exportEvents: () => allEvents,

        requestedCreatePayment: () => pushEvent(EventIdentifiers.REQUESTED_CREATE_PAYMENT),
        requestedCreateProduct: () => pushEvent(EventIdentifiers.REQUESTED_CREATE_PRODUCT),
        requestedCreateShop: () => pushEvent(EventIdentifiers.REQUESTED_CREATE_SHOP),
        requestedDeleteShop: () => pushEvent(EventIdentifiers.REQUESTED_DELETE_SHOP),
        requestedGetApiState: () => pushEvent(EventIdentifiers.REQUESTED_GET_API_STATE),
        requestedGetProduct: () => pushEvent(EventIdentifiers.REQUESTED_GET_PRODUCT),
        requestedGetShop: () => pushEvent(EventIdentifiers.REQUESTED_GET_SHOP),
        requestedGetUserPrivateSettings: () =>
            pushEvent(EventIdentifiers.REQUESTED_GET_USER_PUBLIC_PROFILE),
        requestedGetUserPublicProfile: () =>
            pushEvent(EventIdentifiers.REQUESTED_GET_USER_PRIVATE_SETTINGS),
        requestedLogIn: () => pushEvent(EventIdentifiers.REQUESTED_LOG_IN),
        requestedLogOut: () => pushEvent(EventIdentifiers.REQUESTED_LOG_OUT),
        requestedModifyProduct: () => pushEvent(EventIdentifiers.REQUESTED_MODIFY_PRODUCT),
        requestedModifyShop: () => pushEvent(EventIdentifiers.REQUESTED_MODIFY_SHOP),
        requestedRegisterByMail: () => pushEvent(EventIdentifiers.REQUESTED_REGISTER_BY_MAIL),

        start: () => pushEvent(EventIdentifiers.START),
        stop: () => pushEvent(EventIdentifiers.STOP),
    };
};
