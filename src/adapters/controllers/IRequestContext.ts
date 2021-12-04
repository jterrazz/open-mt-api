import { Context } from 'koa';
import { ITrackerService } from '@application/contracts/ITrackerService';
import { User } from '@entities/user';

export interface IRequestContext extends Context {
    requestTracker: ITrackerService;
    authenticatedUser?: User;
}
