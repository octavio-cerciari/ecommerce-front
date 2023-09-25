import { Injectable } from '@angular/core';
import { Product } from '../../model/product';
import { Cart, ItemCart } from '../../model/cart';

@Injectable({
	providedIn: 'root'
})
export class CartService {
	cart: Cart = { items: [], total: 0 };
	constructor() { }

	getCart(): Cart {
		return this.cart;
	}

	addItem(item: Product) {
		let existentItem = this.cart.items.filter(element => item.id === element.product.id)
		if (existentItem.length > 0) {existentItem[0].quantity++}
		else this.cart.items.push({ product: item, quantity: 1 } as ItemCart);
		this.totalCalc();
	}

	removeItem(item: Product) {
		this.cart.items.splice(this.cart.items.findIndex(element => element.product.id === item.id), 1)
		this.totalCalc();
	}

	cartCount() {
		let countItems = 0
		this.cart.items.forEach(element => countItems = countItems + 1 * element.quantity)
		return countItems.toLocaleString();
	}

	totalCalc() {
		this.cart.items.forEach(element => {
			this.cart.total = this.cart.total + element.product.price * element.quantity
		})
	}
}
