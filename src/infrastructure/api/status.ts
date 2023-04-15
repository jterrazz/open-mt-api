import { API_STATUS, GetApiStatus } from '@domain/api/status';

export const getApiStatusFactory = (apiVersion: string): GetApiStatus => {
    return async () => {
        return {
            message: 'Hello World!',
            status: API_STATUS.UP,
            time: new Date(),
            version: apiVersion,
        };
    };
};
