import { PrismaClient } from '@prisma/client';

export interface IDatabase {
    client: PrismaClient;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
}
