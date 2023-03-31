import { ITrackerRepository } from './tracker.repository';

export type InitTrackerForRequest = (userId?: number) => ITrackerRepository;
