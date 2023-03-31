import { ApiInformation } from '@domain/api/information';
import { ApiStatus } from '@domain/api/status';

import packageJson from '../../../package.json';

export const getApiInformation = async (): Promise<ApiInformation> => {
    return {
        message: 'Hello World!',
        status: ApiStatus.OK,
        time: new Date(),
        version: packageJson.version,
    };
};
