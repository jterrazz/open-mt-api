import { Context, Request } from 'koa';
import { ITrackerRepository } from '@domain/tracker/tracker-repository';
import { UserEntity } from '@domain/user/user-entity';

interface IKoaRequest<RequestBody> extends Request {
    body?: RequestBody;
}

export interface IKoaContext<RequestParams, RequestBody, ResponseBody>
    extends Context {
    request: IKoaRequest<RequestBody>;
    params: RequestParams;
    body: ResponseBody;
    requestTracker?: ITrackerRepository;
    authenticatedUser?: UserEntity;
}

export interface IInitiatedKoaContext<RequestParams, RequestBody, ResponseBody>
    extends IKoaContext<RequestParams, RequestBody, ResponseBody> {
    requestTracker: ITrackerRepository;
    authenticatedUser: UserEntity;
}

export type IController<RequestParams, RequestBody, ResponseBody> = (
    ctx: IKoaContext<RequestParams, RequestBody, ResponseBody>,
) => Promise<void>;

export type IInitiatedController<RequestParams, RequestBody, ResponseBody> = (
    ctx: IInitiatedKoaContext<RequestParams, RequestBody, ResponseBody>,
) => Promise<void>;

export interface IControllers {
    users: {
        getPublicProfile: IController<unknown, unknown, unknown>;
    };
    api: {
        getState: IController<unknown, unknown, unknown>;
    };
    shops: {
        createShop: IController<unknown, unknown, unknown>;
        getShop: IController<unknown, unknown, unknown>;
    };
}
