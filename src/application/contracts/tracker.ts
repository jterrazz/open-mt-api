export type TrackerEvents = {
    requested: {
        getApiState: () => void;
        createNewPayment: () => void;
        createNewProduct: () => void;
    };
};

export type TrackerEvent = {
    name: string;
    date: Date;
};

export interface ITracker {
    events: TrackerEvents;
    start: () => void;
    stop: () => void;
    exportResult?: () => TrackerEvent[];
}

export type ITrackerFactory = () => ITracker;
