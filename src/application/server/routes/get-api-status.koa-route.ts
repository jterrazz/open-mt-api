import { KoaRoute } from '@application/server/routes/koa-route';

import { GetApiStatusController } from '@domain/api/get-api-status.controller';

import { apiStatusKoaSerializer } from '@adapters/api/api-status.koa-serializer';
import { defaultKoaDeserializer } from '@adapters/default.koa-deserializer';

import { getApiStatusControllerFactory } from '@infrastructure/api/get-api-status.controller';

export class GetApiStatusKoaRoute extends KoaRoute<GetApiStatusController> {
    public static inject = ['version'] as const;

    constructor(version: string) {
        const getApiStatusController = getApiStatusControllerFactory(version);

        super(defaultKoaDeserializer, getApiStatusController, apiStatusKoaSerializer);
    }
}
