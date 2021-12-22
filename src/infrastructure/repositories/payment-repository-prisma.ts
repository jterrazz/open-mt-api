import { IDatabase } from '@application/contracts';
import { IPaymentRepository } from '@domain/payment/payment.repository';
import { PaymentEntity } from '@domain/payment/payment.entity';

export const paymentRepositoryPrismaFactory = (
    database: IDatabase,
): IPaymentRepository => {
    return {
        async merge(payment: PaymentEntity): Promise<void> {},
        async persist(payment: PaymentEntity): Promise<void> {},
    };
};
