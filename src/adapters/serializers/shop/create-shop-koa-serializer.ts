import * as z from 'zod';
import { IKoaContext } from '@adapters/contracts/controllers';
import { IKoaSerializer } from '@adapters/serializers/koa-serializer';
import { Z_SHOP_HANDLE, Z_SHOP_NAME } from '@domain/shop/shop-entity';
import { mapZodErrorToUnprocessableEntityError } from '@application/utils/zod/map-unprocessable-entity-error';

export class CreateShopKoaSerializer implements IKoaSerializer {
    deserializeRequest(ctx: IKoaContext): { handle: string; name: string } {
        return mapZodErrorToUnprocessableEntityError(() =>
            z
                .object({
                    handle: Z_SHOP_HANDLE,
                    name: Z_SHOP_NAME,
                })
                .parse(ctx.request.body),
        );
    }

    serializeResponse(response: { handle: string; name: string }) {
        return response;
    }
}
