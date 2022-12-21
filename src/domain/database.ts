export interface IDatabase {
    client: unknown;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
}
