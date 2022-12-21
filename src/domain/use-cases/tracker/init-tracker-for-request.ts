import { ITrackerRepository } from '@domain/use-cases/tracker/tracker.repository';

export type InitTrackerForRequest = (userId?: number) => ITrackerRepository;
