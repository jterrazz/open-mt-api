export type TrackerEvents = {
    requested: {
        getApiState: () => void;
        createNewPayment: () => void;
    };
};

export interface ITrackerService {
    events: TrackerEvents;
    start: () => void;
    stop: () => void;
}
