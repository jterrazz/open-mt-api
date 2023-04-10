import { Applicable } from '@application/../../domain/helpers/applicable';

import { InitTrackerForRequest } from '@domain/../../domain/use-cases/tracker/init-tracker-for-request';
import { IConfiguration } from '~/domain';

import { trackerRepositoryInMemoryFactory } from '../repositories/tracker.repository-in-memory';

type InitTrackerForRequestInMemory = {
    factory: (configuration: IConfiguration) => InitTrackerForRequest;
} & Applicable;

export const initTrackerForRequestInMemoryFactory: InitTrackerForRequestInMemory = {
    factory: (configuration: IConfiguration) => {
        return (userId) => {
            return trackerRepositoryInMemoryFactory();
        };
    },
    isApplicable: (configuration: IConfiguration) => true,
};
