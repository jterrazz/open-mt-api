import * as bcrypt from 'bcrypt';
import { ICheckPassword } from '@domain/encryption/check-password';

export const checkBcryptPassword: ICheckPassword = (
    password,
    hashedPassword,
) => {
    return bcrypt.compare(password, hashedPassword);
};
