export type ITrackerRepository = {
    requestedGetApiState: () => void;
    requestedCreateNewPayment: () => void;
    requestedCreateNewProduct: () => void;
    start: () => void;
    stop: () => void;
    exportEvents: () => any;
};
