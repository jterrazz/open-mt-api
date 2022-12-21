import { StatusCodes } from 'http-status-codes';

type ClientErrorMeta = {
    fields: string[];
};

export class ClientError extends Error {
    public httpCode: StatusCodes;
    public publicMessage: string;
    public publicMeta?: ClientErrorMeta;

    constructor(
        httpCode: StatusCodes,
        publicMessage: string,
        publicMeta?: ClientErrorMeta,
    ) {
        super();

        this.httpCode = httpCode;
        this.publicMessage = publicMessage;
        this.publicMeta = publicMeta;
    }
}
