import { AccountCapability, AccountType } from '@entities/account';
import { User } from '@entities/user';

export const createMockUser = (): User => {
    return {
        accounts: [
            {
                automatedSyncing: false,
                bankId: '',
                bankName: '',
                capabilities: new Set([AccountCapability.sender]),
                iban: 'the-account-0-iban',
                id: '',
                isPublic: true,
                name: '',
                synced: true,
                type: AccountType.bank,
            },
        ],
        biography: 'string',
        firstName: 'string',
        handle: 'string',
        id: 'string',
        lastName: 'string',
    };
};
