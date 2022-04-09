import { IKoaSerializer } from '@adapters/serializers/koa-serializer';

export class GetApiStateKoaSerializer implements IKoaSerializer {
    deserializeRequest() {
        return null;
    }

    serializeResponse(props: {
        env: string;
        state: string;
        time: Date;
        version: string;
    }) {
        return props;
    }
}
