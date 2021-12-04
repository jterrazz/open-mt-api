import { IProjectDependencies } from '@application/contracts/IProjectDependencies';
import { ITrackerService } from '@application/contracts/ITrackerService';

export const getApiStateFactory = (
    { configuration }: IProjectDependencies,
    tracker: ITrackerService,
) => {
    return () => {
        tracker.events.requested.getApiState();

        return {
            env: configuration.ENVIRONMENT,
            state: 'OK',
            time: new Date(),
            version: configuration.API.VERSION,
        };
    };
};
