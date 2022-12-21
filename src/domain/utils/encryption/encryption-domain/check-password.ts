import { HashedPasswordEntity } from '@domain/utils/encryption/encryption-domain/hashed-password.entity';

export type CheckPassword = (
    password: string,
    hashedPassword: HashedPasswordEntity,
) => Promise<boolean>;
