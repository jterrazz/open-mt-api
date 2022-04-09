import * as z from 'zod';
import { IKoaContext } from '@adapters/contracts/controllers';
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

    serializeResponse(response: {
        description: string | null;
        handle: string;
        name: string;
    }) {
        return response;
    }
}
