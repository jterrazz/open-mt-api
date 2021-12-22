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

export interface IControllers {
    users: {
        getPublicProfile: (ctx: IKoaContext<any, any>) => Promise<void>; // TODO To type
    };
    api: {
        getState: (ctx: IKoaContext<any, any>) => Promise<void>; // TODO To type
    };
    shops: {
        createNewShop: (ctx: IKoaContext<any, any>) => Promise<void>; // TODO To type
    };
}
