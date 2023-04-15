import { PromiseReturnType } from '@prisma/client/scripts/default-index';

import { KoaContext, KoaDeserializer } from '@adapters/koa-deserializer.adapter';
import { KoaSerializer } from '@adapters/koa-serializer.adapter';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class KoaRoute<Controller extends (arg: any) => Promise<any>> {
    constructor(
        private readonly deserializer: KoaDeserializer<Parameters<typeof controller>[0]>,
        private readonly controller: Controller,
        private readonly serializer: KoaSerializer<PromiseReturnType<typeof controller>>,
    ) {}

    public async route(ctx: KoaContext): Promise<void> {
        const input = await this.deserializer(ctx);
        const output = await this.controller(input);

        await this.serializer(ctx, output);
    }
}
