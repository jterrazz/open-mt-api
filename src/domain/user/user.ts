export interface User {
    id: number;
    email: string;
}

export interface GetUser {
    (id: number): Promise<User | null>;
}
