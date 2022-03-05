import * as bcrypt from 'bcrypt';
import { IHashPassword } from '@domain/encryption/hash-password';

const SALT_ROUNDS = 10;

export const hashBcryptPassword = async (password): Promise<IHashPassword> => {
    return bcrypt.hash(password, SALT_ROUNDS);
};
