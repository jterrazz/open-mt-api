import * as z from 'zod';
import {
    IInitiatedKoaContext,
    IKoaContext,
} from '@adapters/contracts/controllers';
import { IKoaSerializer } from '@adapters/serializers/koa-serializer';
import { Z_SHOP_HANDLE } from '@domain/shop/shop-entity';
import { mapZodErrorToUnprocessableEntityError } from '@application/utils/zod/map-unprocessable-entity-error';

export class GetShopKoaSerializer implements IKoaSerializer {
    deserializeRequest(ctx: IKoaContext) {
        return mapZodErrorToUnprocessableEntityError(() =>
            z
                .object({
                    shopHandle: Z_SHOP_HANDLE,
                })
                .parse(ctx.params),
        );
    }

    serializeResponse(
        ctx: IInitiatedKoaContext,
        response: {
            description: string | null;
            handle: string;
            name: string;
        },
    ) {
        ctx.body = {
            description: response.description,
            handle: response.handle,
            name: response.name,
        };
    }
}
