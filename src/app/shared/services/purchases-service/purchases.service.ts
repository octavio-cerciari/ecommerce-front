import { Injectable } from '@angular/core';
import { Cart } from '../../model/cart';
import { LocalStorageService } from '../local-storage-service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(private localStorageService: LocalStorageService) { }

  checkout(cart: Cart) {
	let oldPurchases = this.localStorageService.get('purchases')?.purchases;
	if (oldPurchases) this.localStorageService.set('purchases', { purchases: [...oldPurchases, cart] })
	else this.localStorageService.set('purchases', { purchases: [cart] })
  }

  getCount() {
	return this.localStorageService.get('purchases')?.purchases.length || 0;
  }

  getPurchases() {
	return this.localStorageService.get('purchases')?.purchases;
  }
}
