import { IConfiguration } from '~/domain';

export type GetApiState = () => {
    env: string;
    state: string;
    time: Date;
    version: string;
};

export const getApiStateFactory = (
    configuration: IConfiguration,
): GetApiState => {
    return () => ({
        env: configuration.ENVIRONMENT,
        state: 'UP',
        time: new Date(),
        version: configuration.API.VERSION,
    });
};
