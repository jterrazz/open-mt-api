import * as bcrypt from 'bcrypt';
import { IHashPassword } from '@application/contracts/encryption/hash-password';

const SALT_ROUNDS = 10;

export const hashBcryptPassword: IHashPassword = async (password) => {
    return bcrypt.hash(password, SALT_ROUNDS);
};
