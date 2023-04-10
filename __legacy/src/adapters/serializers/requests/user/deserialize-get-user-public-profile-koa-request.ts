import * as z from 'zod';

import { zodErrorToUnprocessableEntityErrorWrapper } from '@application/../../../../domain/helpers/zod/zod-error-to-unprocessable-entity-error-wrapper';

import { IKoaDeserializer } from '../koa-serializer';

export type DeserializeGetUserKoaRequest = IKoaDeserializer<{
    userId: number;
}>;

export const deserializeGetUserPublicProfileKoaRequest: DeserializeGetUserKoaRequest = (ctx) => {
    return zodErrorToUnprocessableEntityErrorWrapper(() =>
        z
            .object({
                userId: z.string().regex(/^\d+$/).transform(Number),
            })
            .parse(ctx.params),
    );
};
