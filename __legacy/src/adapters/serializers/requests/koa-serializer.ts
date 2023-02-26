import { IKoaContext } from '../../controllers/koa-controller';

// TODO To be deleted
export type IKoaSerializer<Params> = (ctx: IKoaContext, args: Params) => void;
export type IKoaDeserializer<Result> = (ctx: IKoaContext) => Result;
