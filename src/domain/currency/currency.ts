export const Currency = {
    EUR: 'EUR',
    USD: 'USD',
};

export type Currency = typeof Currency[keyof typeof Currency];
