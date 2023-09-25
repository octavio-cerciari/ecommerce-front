import { Product } from "./product";

export interface ItemCart {
	product: Product,
	quantity: number
}

export interface Cart {
	items: ItemCart[],
	total: number
} 