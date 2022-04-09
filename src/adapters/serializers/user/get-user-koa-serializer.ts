import * as z from 'zod';
import { IInitiatedKoaContext } from '@adapters/contracts/controllers';
import { IKoaSerializer } from '@adapters/serializers/koa-serializer';
import { NotFoundError } from '@domain/error/client/not-found-error';
import { UserEntity } from '@domain/user/user-entity';
import { mapZodErrorToUnprocessableEntityError } from '@application/utils/zod/map-unprocessable-entity-error';

export class GetUserKoaSerializer implements IKoaSerializer {
    deserializeRequest(ctx: IInitiatedKoaContext): { handle: string } {
        return mapZodErrorToUnprocessableEntityError(() =>
            z
                .object({
                    handle: z.string(),
                })
                .parse(ctx.params),
        );
    }

    serializeResponse(user: { firstName: string; lastName: string }): {
        firstName: string;
        lastName: string;
    } {
        if (!user) {
            throw new NotFoundError();
        }

        return {
            firstName: user.firstName,
            lastName: user.firstName,
        };
    }
}
