export interface Server {
    start: (port: number) => Promise<void>;
}
