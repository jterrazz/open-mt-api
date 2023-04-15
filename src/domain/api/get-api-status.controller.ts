import { API_STATUS } from '@domain/api/status';

export interface ApiStatusMetadata {
    status: API_STATUS;
    message: string;
    time: Date;
    version: string;
}

export interface GetApiStatusController {
    (): Promise<ApiStatusMetadata>;
}
