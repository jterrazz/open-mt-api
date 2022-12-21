import { Currency } from '@domain/use-cases/price/currency';
import { ShopEntity } from '@domain/use-cases/shop/shop.entity';

export interface ProductEntity {
    id: number;
    name: string;
    priceCentsAmount: number;
    priceCurrency: Currency;
    shop?: ShopEntity;
    shopId: number; // Make optional or even other typescript type
}
