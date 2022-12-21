import { Applicable } from '@application/../../domain/utils/applicable';
import { IConfiguration } from '~/domain';
import { InitTrackerForRequest } from '@domain/use-cases/tracker/init-tracker-for-request';
import { trackerRepositoryMixpanelFactory } from '@infrastructure/repositories/tracker.repository-mixpanel';

type InitTrackerForRequestInMemory = {
    factory: (configuration: IConfiguration) => InitTrackerForRequest;
} & Applicable;

export const initTrackerForRequestMixpanelFactory: InitTrackerForRequestInMemory =
    {
        factory: (configuration) => {
            return (userId) => {
                return trackerRepositoryMixpanelFactory(configuration);
            };
        },
        isApplicable: (configuration: IConfiguration) =>
            !!configuration.SERVICES.MIXPANEL?.SECRET,
    };
