import { IDatabaseService } from '@application/contracts/IDatabaseService';
import { IPaymentRepository } from '@application/contracts/repositories/IPaymentRepository';
import { Payment } from '@entities/payment';

export const paymentRepositoryPrismaFactory = (
    database: IDatabaseService,
): IPaymentRepository => {
    return {
        async merge(payment: Payment): Promise<void> {},
        async persist(payment: Payment): Promise<void> {},
    };
};
