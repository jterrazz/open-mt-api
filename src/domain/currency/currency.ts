export const Currency = {
    // TODO Refacto to reflect prisma
    EUR: 'EUR',
    USD: 'USD',
};

export type Currency = typeof Currency[keyof typeof Currency];