import { HashedPasswordEntity } from '@domain/../../../application/utils/encryption/encryption-domain/hashed-password.entity';
import { LANGUAGE } from '@domain/use-cases/user/language';

export type UserEntity = {
    id: number;
    authentication: {
        email: string;
        hashedPassword: HashedPasswordEntity;
    };
    profile: {
        firstName: string;
        lastName: string;
    };
    settings: {
        language: LANGUAGE;
    };
};
