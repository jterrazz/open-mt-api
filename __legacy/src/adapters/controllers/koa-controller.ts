import { Context } from 'koa';

import { ITrackerRepository } from '@domain/../../domain/use-cases/tracker/tracker.repository';
import { UserEntity } from '@domain/../../domain/use-cases/user/user.entity';

export interface IKoaContext extends Context {
    requestTracker?: ITrackerRepository;
    authenticatedUser?: UserEntity;
}

export interface IInitiatedKoaContext extends Context {
    requestTracker: ITrackerRepository;
    authenticatedUser?: UserEntity;
    logout: () => Promise<void>;
}

export type IKoaController = (ctx: IKoaContext) => Promise<void>;
export type IInitiatedKoaController = (ctx: IInitiatedKoaContext) => Promise<void>;
