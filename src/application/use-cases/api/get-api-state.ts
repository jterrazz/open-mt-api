import { IProjectDependencies, ITracker } from '@application/contracts';

export const getApiStateFactory = (
    { configuration }: IProjectDependencies,
    tracker: ITracker,
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
