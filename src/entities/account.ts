export enum AccountType {
    bank,
    crypto,
}

export enum AccountCapability {
    sender,
    senderWithWebview,
    receiver,
}

export type Account = {
    id: string;
    type: AccountType;
    name: string;
    automatedSyncing: boolean;
    synced: boolean;
    isPublic: boolean;
    capabilities: Set<AccountCapability>;
};

// TODO to Public Account method

export type BankAccount = Account & {
    bankId: string;
    bankName: string;
    iban: string;
};

export type CryptoAccount = Account & {
    cryptoCurrency: string;
    cryptoAddress: string;
};
