import Router from 'koa-router';
import { ZodObject, ZodRawShape } from 'zod';

import { ExposedError } from '@domain/errors/exposed.error';
import { UnprocessableEntityError } from '@domain/errors/functional/unprocessable-entity.error';

import { Logger } from '@ports/logger';

export type GetTypeSafeInputsFromKoa = <T extends ZodObject<ZodRawShape>>(
    schema: T,
) => ReturnType<T['parse']>;

export const getTypeSafeInputsFromKoaFactory = (
    logger: Logger,
    ctx: Router.RouterContext,
): GetTypeSafeInputsFromKoa => {
    return (schema: ZodObject<ZodRawShape>) => {
        try {
            return schema.parse({
                params: ctx.params,
            }) as unknown as never;
        } catch (e) {
            logger.info(`request param validation failed: ${JSON.stringify(e)}`);
            const error = new UnprocessableEntityError(e, 'Request param validation failed');

            throw new ExposedError(error, 'Request param validation failed');
        }
    };
};
