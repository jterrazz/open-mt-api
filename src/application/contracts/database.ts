export interface IDatabase {
    client: any; // TODO How to pass client as dependency without using prisma ...
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
}
