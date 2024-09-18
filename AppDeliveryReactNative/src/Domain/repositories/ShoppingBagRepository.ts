import { Product } from "../entities/Product"

export type ShoppingBagRepository = {
    save(products: Product[]): Promise<void>
    getShoppingBag(): Promise<Product[]>
}