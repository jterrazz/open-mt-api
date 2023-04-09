import { HashedPasswordEntity } from './hashed-password.entity';

export type HashPassword = (password: string) => Promise<HashedPasswordEntity>;
