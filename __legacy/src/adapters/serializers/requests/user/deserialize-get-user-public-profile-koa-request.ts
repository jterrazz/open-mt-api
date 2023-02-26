import * as z from 'zod';
import { IKoaDeserializer } from '../koa-serializer';
import { zodErrorToUnprocessableEntityErrorWrapper } from '@application/../../../../domain/utils/zod/zod-error-to-unprocessable-entity-error-wrapper';

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
