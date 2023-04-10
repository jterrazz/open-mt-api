import { Applicable } from '@application/../../domain/helpers/applicable';

import { InitTrackerForRequest } from '@domain/../../domain/use-cases/tracker/init-tracker-for-request';
import { IConfiguration } from '~/domain';

import { trackerRepositoryMixpanelFactory } from '../repositories/tracker.repository-mixpanel';

type InitTrackerForRequestInMemory = {
    factory: (configuration: IConfiguration) => InitTrackerForRequest;
} & Applicable;

export const initTrackerForRequestMixpanelFactory: InitTrackerForRequestInMemory = {
    factory: (configuration) => {
        return (userId) => {
            return trackerRepositoryMixpanelFactory(configuration);
        };
    },
    isApplicable: (configuration: IConfiguration) => !!configuration.SERVICES.MIXPANEL?.SECRET,
};
