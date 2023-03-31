import { KoaContext, KoaDeserializer } from '@adapters/koa-deserializer.adapter';
import { KoaSerializer } from '@adapters/koa-serializer.adapter';

interface Controller<Input, Output> {
    (input: Input): Promise<Output>;
}

export const koaRouteFactory = <ControllerInput, ControllerOutput>(
    deserializer: KoaDeserializer<ControllerInput>,
    controller: Controller<ControllerInput, ControllerOutput>,
    serializer: KoaSerializer<ControllerOutput>,
): ((ctx: KoaContext) => Promise<void>) => {
    return async (ctx: KoaContext) => {
        const input = await deserializer(ctx);
        const output = await controller(input);

        await serializer(ctx, output);
    };
};
