import { UserEntity } from '@domain/user/user-entity';

export type ICheckPasswordAgainstUser = (
    password: string,
    user: UserEntity,
) => boolean;

export const checkPasswordAgainstUser: ICheckPasswordAgainstUser = (
    password,
    user,
) => {
    return user.hashedPassword === password; // TODO
};
