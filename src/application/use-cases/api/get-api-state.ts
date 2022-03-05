import { IConfiguration } from '@application/contracts';
import { ITrackerRepository } from '@domain/tracker/tracker-repository';

export const getApiStateFactory = (
    configuration: IConfiguration,
    tracker: ITrackerRepository,
) => {
    return () => {
        tracker.requestedGetApiState();

        return {
            env: configuration.ENVIRONMENT,
            state: 'UP',
            time: new Date(),
            version: configuration.API.VERSION,
        };
    };
};
