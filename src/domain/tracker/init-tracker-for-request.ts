import { ITrackerRepository } from '@domain/tracker/tracker-repository';

export const initTrackerForRequestFactory = (
    trackerRepository: ITrackerRepository,
) => {
    return (userId?: string): ITrackerRepository => {
        trackerRepository.start();

        return trackerRepository;
    };
};
