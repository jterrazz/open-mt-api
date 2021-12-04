import { Payment } from '@entities/payment';

export interface IPaymentRepository {
    persist(payment: Payment): Promise<void>;
    merge(payment: Payment): Promise<void>;
}
