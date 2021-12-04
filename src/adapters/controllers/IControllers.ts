import { Context } from 'koa';

// Link controllers to the webserver implementation

export interface IControllers {
    users: {
        getPublicProfile: (ctx: Context) => Promise<void>;
    };
    payments: {
        createNewPayment: (ctx: Context) => Promise<void>;
    };
    api: {
        getState: (ctx: Context) => Promise<void>;
    };
}
