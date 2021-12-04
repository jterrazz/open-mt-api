import { BankAccount } from '@entities/account';

export type User = {
    id: string;
    handle: string;
    firstName: string;
    lastName: string;
    biography: string;
    accounts: BankAccount[];
};
