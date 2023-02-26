import { Applicable } from '@application/../../domain/utils/applicable';
import { IConfiguration } from '~/domain';
import { InitTrackerForRequest } from '@domain/use-cases/tracker/init-tracker-for-request';
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
