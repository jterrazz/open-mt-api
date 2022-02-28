export interface ProductEntity {
    id: string;
    name: string;
    priceCentsAmount: number;
    priceCurrency: 'EUR' | 'USD';
}
