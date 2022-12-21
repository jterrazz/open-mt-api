import { HashedPasswordEntity } from '@domain/utils/encryption/encryption-domain/hashed-password.entity';

export type HashPassword = (password: string) => Promise<HashedPasswordEntity>;
