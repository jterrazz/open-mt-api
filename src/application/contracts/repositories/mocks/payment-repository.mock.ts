import { IPaymentRepository } from '@application/contracts/repositories/IPaymentRepository';
import { Payment } from '@entities/payment';

export const createMockPaymentRepository = (): IPaymentRepository => {
    return {
        merge: jest.fn(),
        persist: jest.fn(),
    };
};
