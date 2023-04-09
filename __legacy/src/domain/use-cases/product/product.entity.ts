import { Currency } from '../price/currency';
import { ShopEntity } from '../shop/shop.entity';

export interface ProductEntity {
    id: number;
    name: string;
    priceCentsAmount: number;
    priceCurrency: Currency;
    shop?: ShopEntity;
    shopId: number; // Make optional or even other typescript type
}
