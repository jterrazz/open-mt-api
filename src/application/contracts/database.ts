export interface IDatabase {
    client: any;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
}
