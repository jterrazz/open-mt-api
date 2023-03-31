import * as bcrypt from 'bcrypt';
import { CheckPassword } from '@domain/encryption-domain/check-password';

export const checkBcryptPassword: CheckPassword = (
    password,
    hashedPassword,
) => {
    return bcrypt.compare(password, hashedPassword);
};
