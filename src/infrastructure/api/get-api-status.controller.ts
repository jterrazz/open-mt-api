import { GetApiStatusController } from '@domain/api/get-api-status.controller';
import { API_STATUS } from '@domain/api/status';

export const getApiStatusControllerFactory = (apiVersion: string): GetApiStatusController => {
    return async () => {
        return {
            message: 'Hello World!',
            status: API_STATUS.UP,
            time: new Date(),
            version: apiVersion,
        };
    };
};
