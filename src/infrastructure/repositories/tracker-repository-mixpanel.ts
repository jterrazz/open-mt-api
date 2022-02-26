import { IConfiguration, IStrategy } from '@application/contracts';
import { ITrackerRepository } from '@domain/tracker/tracker-repository';

export const trackerRepositoryMixpanelFactory = (): ITrackerRepository &
    IStrategy => {
    const repository: ITrackerRepository = {
        exportEvents: () => {},

        requestedCreateNewPayment: () => {},
        requestedCreateNewProduct: () => {},
        requestedGetApiState: () => {},

        start: () => {},
        stop: () => {},
    };

    return {
        ...repository,
        isApplicable: (environment: IConfiguration['ENVIRONMENT']) =>
            environment !== 'test',
    };
};
