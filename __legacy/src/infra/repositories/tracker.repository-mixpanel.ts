import Mixpanel from 'mixpanel';

import { EventIdentifiers } from '@domain/../../domain/use-cases/tracker/events';
import { ITrackerRepository } from '@domain/../../domain/use-cases/tracker/tracker.repository';
import { IConfiguration } from '~/domain';

export const trackerRepositoryMixpanelFactory = (
    configuration: IConfiguration,
): ITrackerRepository => {
    const secret = configuration.SERVICES.MIXPANEL?.SECRET;

    if (!secret) {
        throw new Error('mixpanel tracker repository requires a secret in configuration');
    }

    const mixpanel = Mixpanel.init(secret, {
        protocol: 'https',
    });

    return {
        exportEvents: () => {},

        requestedCreatePayment: () => {
            mixpanel.track(EventIdentifiers.REQUESTED_CREATE_PAYMENT);
        },
        requestedCreateProduct: () => {},
        requestedCreateShop: () => {},
        requestedDeleteShop: () => {},
        requestedGetApiState: () => {
            mixpanel.track(EventIdentifiers.REQUESTED_GET_API_STATE);
            // TODO Add logger on all calls
        },
        requestedGetProduct: () => {},
        requestedGetShop: () => {},
        requestedGetUserPrivateSettings: () => {},
        requestedGetUserPublicProfile: () => {},
        requestedLogIn: () => {},
        requestedLogOut: () => {},
        requestedModifyProduct: () => {},
        requestedModifyShop: () => {},
        requestedRegisterByMail: () => {},

        start: () => {
            // mixpanel.people.set('billybob', {
            //     plan: 'premium',
            //     games_played: 1
            // }, {
            //     $ignore_time: true
            // });
        },
        stop: () => {},
    };
};
