import * as z from 'zod';
import { IInitiatedKoaContext } from '@adapters/contracts/controllers';
import { IKoaSerializer } from '@adapters/serializers/koa-serializer';
import { NotFoundError } from '@domain/error/client/not-found-error';
import { mapZodErrorToUnprocessableEntityError } from '@application/utils/zod/map-unprocessable-entity-error';

export class GetUserKoaSerializer implements IKoaSerializer {
    deserializeRequest(ctx: IInitiatedKoaContext): { userHandle: string } {
        return mapZodErrorToUnprocessableEntityError(() =>
            z
                .object({
                    userHandle: z.string(),
                })
                .parse(ctx.params),
        );
    }

    serializeResponse(
        ctx: IInitiatedKoaContext,
        user: { firstName: string; lastName: string },
    ) {
        ctx.body = {
            firstName: user.firstName,
            lastName: user.lastName,
        };
    }
}
