import * as z from 'zod';
import { Currency, currencySchema } from '@domain/use-cases/price/currency';
import { IKoaDeserializer } from '../koa-serializer';
import { UserEntity } from '@domain/use-cases/user/user.entity';
import { zodErrorToUnprocessableEntityErrorWrapper } from '@application/../../../../domain/utils/zod/zod-error-to-unprocessable-entity-error-wrapper';

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
