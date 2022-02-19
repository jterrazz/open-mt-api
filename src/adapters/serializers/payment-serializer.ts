import * as z from 'zod';

const paymentPropertySchemas = {
    amount: z.number(),
    executionDate: z.date(),
    message: z.string(),
    receiverIban: z.string(),
    senderIban: z.string(),
};

const paymentSchemas = z.object(paymentPropertySchemas);

export const deserializeNewPayment = (rawBody: unknown) => {
    // deserializeCreateShopRequest
    return paymentSchemas.parse(rawBody);
};
