export type ICheckPassword = (
    password: string,
    hashedPassword: string,
) => Promise<boolean>;
