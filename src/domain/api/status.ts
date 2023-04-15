export enum API_STATUS {
    UP = 'UP',
    DOWN = 'DOWN',
}

export interface ApiStatusMetadata {
    status: API_STATUS;
    message: string;
    time: Date;
    version: string;
}

export interface GetApiStatus {
    (): Promise<ApiStatusMetadata>;
}
