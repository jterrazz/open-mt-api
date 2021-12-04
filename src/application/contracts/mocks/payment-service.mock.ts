import {
    IPaymentService,
    PaymentServiceValidationMethod,
} from '@application/contracts/IPaymentService';

export const createMockPaymentService = (): IPaymentService => {
    return {
        initiatePayment: jest.fn(async () => ({
            validationMethod: PaymentServiceValidationMethod.Integrated,
        })),
    };
};
