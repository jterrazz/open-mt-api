import { IInitiatedKoaContext } from '@adapters/controllers/koa-controller';

type ApiState = {
    env: string;
    state: string;
    time: Date;
    version: string;
};

export const serializeApiState = (
    ctx: IInitiatedKoaContext,
    state: ApiState,
) => {
    ctx.body = {
        env: state.env,
        state: state.state,
        time: state.time.toISOString(),
        version: state.version,
    };
};
