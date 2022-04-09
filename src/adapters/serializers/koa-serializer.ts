import { IKoaContext } from '@adapters/contracts/controllers';

export interface IKoaSerializer {
    deserializeRequest(ctx: IKoaContext): unknown;
    serializeResponse(args: unknown): unknown;
}
