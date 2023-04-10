import * as z from 'zod';

import { zodErrorToUnprocessableEntityErrorWrapper } from '@application/../../../../domain/helpers/zod/zod-error-to-unprocessable-entity-error-wrapper';

import { Currency, currencySchema } from '@domain/../../../../domain/use-cases/price/currency';
import { UserEntity } from '@domain/../../../../domain/use-cases/user/user.entity';

import { IKoaDeserializer } from '../koa-serializer';

export type DeserializeCreateProductKoaRequest = IKoaDeserializer<{
    authenticatedUser?: UserEntity;
    productParams: {
        name: string;
        priceCentsAmount: number;
        priceCurrency: Currency;
    };
}>;

export const deserializeCreateProductKoaRequest: DeserializeCreateProductKoaRequest = (ctx) => {
    const parsedData = zodErrorToUnprocessableEntityErrorWrapper(() =>
        z
            .object({
                name: z.string(),
                priceCentsAmount: z.number().int(),
                priceCurrency: currencySchema,
            })
            .parse(ctx.request.body),
    );

    return {
        authenticatedUser: ctx.authenticatedUser,
        productParams: {
            name: parsedData.name,
            priceCentsAmount: parsedData.priceCentsAmount,
            priceCurrency: parsedData.priceCurrency,
        },
    };
};
