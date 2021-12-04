import { Payment } from '@entities/payment';

export enum PaymentServiceValidationMethod {
    Webview = 'webview',
    Integrated = 'integrated',
}

export interface IPaymentService {
    initiatePayment(payment: Payment): Promise<{
        validationUrl?: string;
        validationMethod: PaymentServiceValidationMethod;
    }>;
}
