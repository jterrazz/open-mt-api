import { AuthenticationRequiredError } from '@entities/errors/AuthenticationRequiredError';
import { IRequestContext } from '@adapters/controllers/IRequestContext';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { createMockProjectDependencies } from '@application/contracts/mocks/project-dependencies.mock';
import { createMockUser } from '@entities/mocks/user.mock';
import { paymentsControllerFactory } from '@adapters/controllers/payments.controller';

jest.mock('@application/use-cases/payments/create-new-payment', () => ({
    createNewPaymentFactory: () => () => ({
        validationMethod: 'the-validation-method',
        validationUrl: 'the-validation-url',
    }),
}));

const paymentsController = paymentsControllerFactory(
    createMockProjectDependencies().dependencies,
);

describe('controller - payments', function () {
    describe('createNewPayment()', function () {
        it('should fail if no user is logged', async function () {
            // Given
            const ctx = createMockContext();

            // When
            const ft = () => paymentsController.createNewPayment(ctx);

            // Then
            await expect(ft).rejects.toThrow(AuthenticationRequiredError);
        });

        // it('should fail if the request body is bad', async function () {
        //     // Given
        //     const ctx = createMockContext();
        //     ctx.authenticatedUser = createMockUser();
        //
        //     // When
        //     await paymentsController.createNewPayment(ctx);
        //
        //     // Then
        //     expect(ctx.status).toEqual(200);
        // });
        //
        // it('should return a successful response', async function () {
        //     // Given
        //     const ctx = createMockContext();
        //     ctx.authenticatedUser = createMockUser();
        //
        //     // When
        //     await paymentsController.createNewPayment(ctx);
        //
        //     // Then
        //     expect(ctx.status).toEqual(200);
        // });
    });
});
