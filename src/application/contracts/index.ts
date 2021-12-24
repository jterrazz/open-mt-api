import { IConfiguration } from '@application/contracts/configuration';
import { IDatabase } from '@application/contracts/database';
import { ILogger } from '@application/contracts/logger';
import { IPaymentRepository } from '@domain/payment/payment.repository';
import { IProductRepository } from '@domain/product/product.repository';
import { IShopRepository } from '@domain/shop/shop-repository';
import { ITracker } from '@application/contracts/tracker';
import { IUserRepository } from '@domain/user/user.repository';

export * from './configuration';
export * from './database';
export * from './logger';
export * from './repository';
export * from './strategy';
export * from './tracker';
export * from './web-server';

export interface IProjectDependencies {
    configuration: IConfiguration;
    logger: ILogger;
    trackerFactory: () => ITracker;
    database: IDatabase;
    repositories: {
        userRepository: IUserRepository;
        paymentRepository: IPaymentRepository;
        productRepository: IProductRepository;
        shopRepository: IShopRepository;
    };
}
