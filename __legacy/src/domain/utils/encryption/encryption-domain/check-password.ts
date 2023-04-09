import { HashedPasswordEntity } from './hashed-password.entity';

export type CheckPassword = (
    password: string,
    hashedPassword: HashedPasswordEntity,
) => Promise<boolean>;
