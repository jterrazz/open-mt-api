import { IPaymentRepository } from '@application/contracts/repositories/IPaymentRepository';
import {
    IPaymentService,
    PaymentServiceValidationMethod,
} from '@application/contracts/IPaymentService';
import { ITrackerService } from '@application/contracts/ITrackerService';
import { Payment } from '@entities/payment';
import {
    UnauthorizedError,
    UnauthorizedErrorName,
} from '@entities/errors/UnauthorizedError';
import { User } from '@entities/user';

export interface NewPaymentPayload {
    senderIban: Payment['senderIban'];
    receiverIban: Payment['receiverIban'];
    amount: Payment['amount'];
    message: Payment['message'];
    executionDate?: Payment['executionDate'];
}

export const createNewPaymentFactory = (
    paymentRepository: IPaymentRepository,
    tracker: ITrackerService,
    paymentService: IPaymentService,
    authenticatedUser: User,
) => {
    return async (
        payment: NewPaymentPayload,
    ): Promise<{
        validationUrl?: string;
        validationMethod: PaymentServiceValidationMethod;
    }> => {
        tracker.events.requested.createNewPayment();

        if (
            !authenticatedUser.accounts.find(
                (account) => account.iban === payment.senderIban,
            )
        ) {
            throw new UnauthorizedError(
                'the new payment IBAN does not belong to the authenticated user',
                UnauthorizedErrorName.IBAN_DOES_NOT_BELONG_TO_AUTHENTICATED_USER,
            );
        }

        const newPayment: Payment = {
            ...payment,
            executionDate: payment.executionDate || new Date(),
        };

        await paymentRepository.persist(newPayment);

        const { validationUrl, validationMethod } =
            await paymentService.initiatePayment(newPayment);

        return { validationMethod, validationUrl };
    };
};
