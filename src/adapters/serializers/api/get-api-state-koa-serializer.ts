import { IInitiatedKoaContext } from '@adapters/contracts/controllers';
import { IKoaSerializer } from '@adapters/serializers/koa-serializer';

export class GetApiStateKoaSerializer implements IKoaSerializer {
    deserializeRequest() {
        return null;
    }

    serializeResponse(
        ctx: IInitiatedKoaContext,
        props: {
            env: string;
            state: string;
            time: Date;
            version: string;
        },
    ) {
        ctx.body = {
            ...props,
            time: props.time.toISOString(),
        };
    }
}
