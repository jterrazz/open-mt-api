import { applicationInjector } from '@application/injector';
import { koaRouteFactory } from '@application/server/routes/koa-route';

import { defaultKoaDeserializer } from '@adapters/routes/default.koa-deserializer';
import { healthKoaSerializer } from '@adapters/routes/health/health.koa-serializer';

import { getHealthControllerFactory } from '@infrastructure/controllers/get-health.controller';
import { getHealthMetadataFactory } from '@infrastructure/health/get-health-metadata';

export const getHealthKoaRouteFactory = () => {
    const logger = applicationInjector.resolve('logger');
    const version = applicationInjector.resolve('version');
    const getHealthMetadata = getHealthMetadataFactory(version);
    const getApiStatusController = getHealthControllerFactory(getHealthMetadata);

    return koaRouteFactory(
        logger,
        getApiStatusController,
        defaultKoaDeserializer,
        healthKoaSerializer,
    );
};
