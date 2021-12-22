import { IPaymentRepository } from './payment.repository';

export const createMockPaymentRepository = (): IPaymentRepository => {
    return {
        merge: jest.fn(),
        persist: jest.fn(),
    };
};
