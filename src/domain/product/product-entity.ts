export interface ProductEntity {
    id?: number;
    name: string;
    priceCentsAmount: number;
    priceCurrency: 'EUR' | 'USD';
}
