import { Component, OnInit } from '@angular/core';
import { Cart, ItemCart } from '../shared/model/cart';
import { Product } from '../shared/model/product';
import { CartService } from '../shared/services/cart-service/cart.service';
import { FavoriteService } from '../shared/services/favorite-service/favorite.service';
import { PurchasesService } from '../shared/services/purchases-service/purchases.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

	cart = {} as Cart;
	favorites = [];

	constructor(private router: Router, private cartService: CartService, private favoriteService: FavoriteService, private purchasesService: PurchasesService) {}

	ngOnInit(): void {
		this.cart = this.cartService.getCart();
		this.getFavorites();
	}

	priceCalc(item: ItemCart) {
		let priceItemValue = item.product.price * item.quantity;
		return 'R$ ' + priceItemValue.toLocaleString()
	}

	addItemCount(item: ItemCart) {
		item.quantity = item.quantity + 1;
		return item.quantity
	}

	removeItemCount(item: ItemCart) {
		if (item.quantity > 1) {
			item.quantity = item.quantity - 1;
		}
		
		return item.quantity
	}

	removeItem(item: Product) {
		this.cartService.removeItem(item);
	}

	totalCalc() {
		let total = 0;
		this.cart.items.forEach(element => {
			total = (total + element.product.price * element.quantity)
		});
		this.cart.total = total;
		return 'R$' + total.toLocaleString();
	}

	addFavorite(item: Product) {
		this.favoriteService.addFavorite(item);
		this.getFavorites();
	}

	favoriteItems(item: Product) {
		return this.favorites.find(f => f === item.id) ? true : false;
	}

	getFavorites() {
		this.favorites = this.favoriteService.getFavorites() || [];
	}

	navigation(url: string) {
		this.router.navigate([url])
	}

	checkout() {
		this.purchasesService.checkout(this.cart)
		this.cart.items = [];
		this.navigation('purchases')
	}
}
