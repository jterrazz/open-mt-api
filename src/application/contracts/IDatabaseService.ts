export interface IDatabaseService {
    client: any;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
}
