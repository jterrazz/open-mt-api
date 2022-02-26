import { PriceEntity } from '@domain/price/price-entity';

export interface ProductEntity {
    id: string;
    name: string;
    price: PriceEntity;
}
