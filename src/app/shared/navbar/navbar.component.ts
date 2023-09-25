import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart-service/cart.service';
import { LocalStorageService } from '../services/local-storage-service/local-storage.service';
import { PurchasesService } from '../services/purchases-service/purchases.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
	searchWord = '';
	theme = 'light-theme'
	constructor(
		private router: Router,
		private cartService: CartService,
		private localStorageService: LocalStorageService,
		private purchasesService: PurchasesService
	) { }

	ngOnInit(): void {
		this.getSearchWord();
	}

	navigation(url: string) {
		this.router.navigate([url])
	}

	setSearchWord(event: any) {
		this.searchWord = event?.target?.value || ''
		this.localStorageService.set('searchWord', this.searchWord)
	}

	getSearchWord() {
		this.searchWord = this.localStorageService.get('searchWord')
	}

	showNav(): boolean {
		this.getSearchWord();
		if (this.router.url == '/' || this.router.url === '/home') { return false }
		else return true
	}

	cartCount() {
		return this.cartService.cartCount();
	}

	purchasesCount() {
		return this.purchasesService.getCount();
	}

	darkMode() {
		console.log(this.theme)
		if (this.theme === 'light-theme') {
		  this.theme = 'dark-theme'
		  document.body.classList.toggle('dark-theme')
		}
		else {
		  this.theme = 'light-theme'
		  document.body.classList.remove('dark-theme')
		}
	  }
}
