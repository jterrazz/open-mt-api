import * as z from 'zod';

import { KoaDeserializer } from '@adapters/routes/koa-deserializer.adapter';

const schema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/).transform(Number),
    }),
});

export const getUserKoaDeserializer: KoaDeserializer<number> = (getTypeSafeInputsFromKoa) => {
    const {
        params: { id },
    } = getTypeSafeInputsFromKoa(schema);

    return id;
};
