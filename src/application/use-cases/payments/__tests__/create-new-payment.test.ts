import {
    NewPaymentPayload,
    createNewPaymentFactory,
} from '@application/use-cases/payments/create-new-payment';
import { PaymentServiceValidationMethod } from '@application/contracts/IPaymentService';
import { UnauthorizedError } from '@entities/errors/UnauthorizedError';
import { createMockPaymentRepository } from '@application/contracts/repositories/mocks/payment-repository.mock';
import { createMockPaymentService } from '@application/contracts/mocks/payment-service.mock';
import { createMockTracker } from '@application/contracts/mocks/tracker.mock';
import { createMockUser } from '@entities/mocks/user.mock';

const getMockedCreateNewPayment = () => {
    const mockPaymentRepository = createMockPaymentRepository();
    const mockTracker = createMockTracker();
    const mockPaymentService = createMockPaymentService();
    const mockAuthenticatedUser = createMockUser();

    const createNewPayment = createNewPaymentFactory(
        mockPaymentRepository,
        mockTracker,
        mockPaymentService,
        mockAuthenticatedUser,
    );

    return {
        createNewPayment,
        mockAuthenticatedUser,
        mockPaymentRepository,
        mockPaymentService,
        mockTracker,
    };
};

const CREATE_MOCKED_NEW_PAYMENT_PAYLOAD = (): NewPaymentPayload => ({
    amount: 42,
    executionDate: new Date('2424-01-01'),
    message: 'the-message',
    receiverIban: 'the-receiver-iban',
    senderIban: 'the-account-0-iban',
});

beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2000-01-01').getTime());
});

afterEach(() => {
    jest.useRealTimers();
});

describe('use-case - createNewPayment()', function () {
    it('should create a new webview payment', async function () {
        // Given
        const { createNewPayment, mockPaymentService, mockPaymentRepository } =
            getMockedCreateNewPayment();

        mockPaymentService.initiatePayment = jest.fn(async () => ({
            validationMethod: PaymentServiceValidationMethod.Webview,
            validationUrl: 'the-validation-url',
        }));

        // When
        const result = await createNewPayment(
            CREATE_MOCKED_NEW_PAYMENT_PAYLOAD(),
        );

        // Then
        expect(mockPaymentRepository.persist).toHaveBeenCalledWith(
            CREATE_MOCKED_NEW_PAYMENT_PAYLOAD(),
        );
        expect(mockPaymentService.initiatePayment).toHaveBeenCalledWith(
            CREATE_MOCKED_NEW_PAYMENT_PAYLOAD(),
        );
        expect(result).toEqual({
            validationMethod: PaymentServiceValidationMethod.Webview,
            validationUrl: 'the-validation-url',
        });
    });

    it('should create a new integrated payment', async function () {
        // Given
        const { createNewPayment, mockPaymentService, mockPaymentRepository } =
            getMockedCreateNewPayment();

        mockPaymentService.initiatePayment = jest.fn(async () => ({
            validationMethod: PaymentServiceValidationMethod.Integrated,
        }));

        // When
        const result = await createNewPayment(
            CREATE_MOCKED_NEW_PAYMENT_PAYLOAD(),
        );

        // Then
        expect(mockPaymentRepository.persist).toHaveBeenCalledWith(
            CREATE_MOCKED_NEW_PAYMENT_PAYLOAD(),
        );
        expect(mockPaymentService.initiatePayment).toHaveBeenCalledWith(
            CREATE_MOCKED_NEW_PAYMENT_PAYLOAD(),
        );
        expect(result).toEqual({
            validationMethod: PaymentServiceValidationMethod.Integrated,
        });
    });

    it('should add a default execution date to a payment', async function () {
        // Given
        const { createNewPayment, mockPaymentRepository, mockPaymentService } =
            getMockedCreateNewPayment();
        const mockedCreatedNewPaymentPayload =
            CREATE_MOCKED_NEW_PAYMENT_PAYLOAD();

        delete mockedCreatedNewPaymentPayload.executionDate;

        // When
        await createNewPayment(mockedCreatedNewPaymentPayload);

        // Then
        expect(mockPaymentRepository.persist).toHaveBeenCalledWith({
            ...CREATE_MOCKED_NEW_PAYMENT_PAYLOAD(),
            executionDate: new Date(),
        });
        expect(mockPaymentService.initiatePayment).toHaveBeenCalledWith({
            ...CREATE_MOCKED_NEW_PAYMENT_PAYLOAD(),
            executionDate: new Date(),
        });
    });

    it('should throw if the senderIban is not from the authenticatedUser accounts', async function () {
        // Given
        const { createNewPayment } = getMockedCreateNewPayment();
        const mockedCreatedNewPaymentPayload =
            CREATE_MOCKED_NEW_PAYMENT_PAYLOAD();

        mockedCreatedNewPaymentPayload.senderIban = 'a random iban';

        // When
        const ft = () => createNewPayment(mockedCreatedNewPaymentPayload);

        // Then
        await expect(ft).rejects.toThrow(UnauthorizedError);
    });
});
