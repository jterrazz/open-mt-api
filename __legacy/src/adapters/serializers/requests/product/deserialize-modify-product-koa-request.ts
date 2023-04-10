import * as z from 'zod';

import { zodErrorToUnprocessableEntityErrorWrapper } from '@application/../../../../domain/helpers/zod/zod-error-to-unprocessable-entity-error-wrapper';

import { UserEntity } from '@domain/../../../../domain/use-cases/user/user.entity';

import { IKoaDeserializer } from '../koa-serializer';

export type DeserializeModifyProductKoaRequest = IKoaDeserializer<{
    authenticatedUser?: UserEntity;
    productId: number;
    productParams: {
        name: string;
    };
}>;

// TODO Move check of authentication here
export const deserializeModifyProductKoaRequest: DeserializeModifyProductKoaRequest = (ctx) => {
    const parsedData = zodErrorToUnprocessableEntityErrorWrapper(() =>
        z
            .object({
                name: z.string(),
                productId: z.string().regex(/^\d+$/).transform(Number),
            })
            .parse({
                ...ctx.request.body,
                ...ctx.params,
            }),
    );

    return {
        authenticatedUser: ctx.authenticatedUser,
        productId: parsedData.productId,
        productParams: {
            name: parsedData.name,
        },
    };
};
