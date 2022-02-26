import { IPaymentRepository } from '@domain/payment/payment-repository';
import { PaymentEntity } from '@domain/payment/payment-entity';
import { PrismaClient } from '@prisma/client';

export const paymentRepositoryPrismaFactory = (
    prismaClient: PrismaClient,
): IPaymentRepository => {
    return {
        async merge(payment: PaymentEntity): Promise<void> {},
        async persist(payment: PaymentEntity): Promise<void> {},
    };
};
