import { IDependencies } from '@application/contracts';
import { ITrackerRepository } from '@domain/tracker/tracker-repository';

export const getApiStateFactory = (
    { configuration }: IDependencies,
    tracker: ITrackerRepository,
) => {
    return () => {
        tracker.requestedGetApiState();

        return {
            env: configuration.ENVIRONMENT,
            state: 'OK',
            time: new Date(),
            version: configuration.API.VERSION,
        };
    };
};
