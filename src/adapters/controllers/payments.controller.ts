import { AuthenticationRequiredError } from '@entities/errors/AuthenticationRequiredError';
import { IControllers } from '@adapters/controllers/IControllers';
import { IProjectDependencies } from '@application/contracts/IProjectDependencies';
import { IRequestContext } from '@adapters/controllers/IRequestContext';
import { createNewPaymentFactory } from '@application/use-cases/payments/create-new-payment';
import { serializeNewPayment } from '@adapters/serializers/payments';

export const paymentsControllerFactory = (
    dependencies: IProjectDependencies,
): IControllers['payments'] => {
    const createNewPayment = async (ctx: IRequestContext) => {
        if (!ctx.authenticatedUser) {
            throw new AuthenticationRequiredError();
        }

        const payment = serializeNewPayment(ctx.body);
        const createNewPayment = createNewPaymentFactory(
            dependencies.repositories.paymentRepository,
            ctx.requestTracker,
            dependencies.paymentService,
            ctx.authenticatedUser,
        );

        const { validationUrl, validationMethod } = await createNewPayment(
            payment,
        );

        ctx.body = { validationMethod, validationUrl };
        ctx.status = 200;
    };

    return { createNewPayment };
};
