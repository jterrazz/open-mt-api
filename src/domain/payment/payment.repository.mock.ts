import { IPaymentRepository } from './payment.repository';

export const createMockOfPaymentRepository = (): IPaymentRepository => {
    return {
        merge: jest.fn(),
        persist: jest.fn(),
    };
};
