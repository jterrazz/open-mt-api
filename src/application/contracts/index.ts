import { IConfiguration } from '@application/contracts/configuration';
import { IDatabase } from '@application/contracts/database';
import { ILogger } from '@application/contracts/logger';
import { IPaymentRepository } from '@domain/payment/payment-repository';
import { IProductRepository } from '@domain/product/product-repository';
import { IShopRepository } from '@domain/shop/shop-repository';
import { IUserRepository } from '@domain/user/user-repository';

export * from './configuration';
export * from './database';
export * from './logger';
export * from './repository';
export * from './strategy';
export * from './web-server';

export interface IDependencies {
    configuration: IConfiguration;
    logger: ILogger;
    database: IDatabase;
    repositories: {
        userRepository: IUserRepository;
        paymentRepository: IPaymentRepository;
        productRepository: IProductRepository;
        shopRepository: IShopRepository;
    };
}
