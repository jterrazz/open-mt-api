import { Account } from '@entities/account';

export interface IAccountRepository {
    getById: () => Account;
}
