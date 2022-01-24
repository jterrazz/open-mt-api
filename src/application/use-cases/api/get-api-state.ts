import { IDependencies, ITracker } from '@application/contracts';

export const getApiStateFactory = (
    { configuration }: IDependencies,
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
