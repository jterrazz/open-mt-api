import { Currency } from '@domain/currency/currency';

export interface ProductEntity {
    id?: number;
    name: string;
    priceCentsAmount: number;
    priceCurrency: Currency;
}
