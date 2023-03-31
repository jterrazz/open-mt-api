import { ApiStatus } from '@domain/api/status';

export interface ApiInformation {
    status: ApiStatus;
    message: string;
    time: Date;
    version: string;
}

export interface GetApiInformation {
    (): Promise<ApiInformation>;
}
