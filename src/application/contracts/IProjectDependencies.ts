import { IConfiguration } from '~/application/contracts/IConfiguration';
import { IDatabaseService } from '~/application/contracts/IDatabaseService';
import { ILogger } from '~/application/contracts/ILogger';
import { IPaymentRepository } from '@application/contracts/repositories/IPaymentRepository';
import { IPaymentService } from '@application/contracts/IPaymentService';
import { ITrackerService } from '~/application/contracts/ITrackerService';
import { IUserRepository } from '~/application/contracts/repositories/IUserRepository';

export interface IProjectDependencies {
    configuration: IConfiguration;
    logger: ILogger;
    trackerFactory: () => ITrackerService;
    database: IDatabaseService;
    paymentService: IPaymentService;
    repositories: {
        userRepository: IUserRepository;
        paymentRepository: IPaymentRepository;
    };
}
