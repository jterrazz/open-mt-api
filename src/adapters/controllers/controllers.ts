import { Context, Request } from 'koa';
import { ITracker } from '@application/contracts';
import { UserEntity } from '@domain/user/user.entity';

interface IKoaRequest<RequestBody> extends Request {
    body?: RequestBody;
    requestTracker?: ITracker;
    authenticatedUser?: UserEntity;
}

export interface IKoaContext<RequestBody, ResponseBody> extends Context {
    request: IKoaRequest<RequestBody>;
    body: ResponseBody;
}

export type IController<RequestBody, ResponseBody> = (
    ctx: IKoaContext<RequestBody, ResponseBody>,
) => Promise<void>;

export interface IControllers {
    users: {
        getPublicProfile: IController<any, any>;
    };
    api: {
        getState: IController<any, any>;
    };
    shops: {
        createNewShop: IController<any, any>;
    };
}
