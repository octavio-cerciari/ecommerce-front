import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../shared/model/product';
import { ProductService } from '../shared/services/product-service/product.service';
import { CartService } from '../shared/services/cart-service/cart.service';
import { FavoriteService } from '../shared/services/favorite-service/favorite.service';
import { LocalStorageService } from '../shared/services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
	allProducts: Product[] = [];
	products: Product[] = [];
	favorites = [];
	filterColor: string[] = [];
	filterSize: string[] = [];
	selectedItems: Product[] = [];
	searchWord = '';

	constructor(
		private productService: ProductService,
		private cartService: CartService,
		private favoriteService: FavoriteService,
		private localStorageService: LocalStorageService,
	) {}

	ngOnInit(): void {
		this.getProducts();
		this.getFavorites();
		this.searchWord = this.getSearchWord();
	}

	getSearchWord() {
		if (this.searchWord !== this.localStorageService.get('searchWord')) {
			this.searchWord = this.localStorageService.get('searchWord');
			this.filterProducts();
		}
		
		return this.localStorageService.get('searchWord') || 'Todos'
	}

	getFavorites() {
		this.favorites = this.favoriteService.getFavorites() || [];
	}

	getProducts() {
		this.productService.getProductsList().subscribe((products: Product[]) => {
			this.products = products;
			this.allProducts = products;
		});
	}

	addItemCart(item: Product) {
		this.cartService.addItem(item);
	}

	favoriteItems(item: Product) {
		return this.favorites.find(f => f === item.id) ? true : false;
	}

	addFilterColor(filter: string) {
		if(this.filterColor.find(f => f === filter)) this.filterColor.splice(this.filterColor.findIndex(f => f === filter), 1)
		else this.filterColor.push(filter);
		this.filterProducts();
	}

	addFilterSize(filter: string) {
		if(this.filterSize.find(f => f === filter)) this.filterSize.splice(this.filterSize.findIndex(f => f === filter), 1)
		else this.filterSize.push(filter);
		this.filterProducts();
	}

	filterByWord(products: Product[]): Product[] {
		let filteredByWord: Product[] = products.filter(item => item?.description?.toLowerCase().includes(this.searchWord?.toLowerCase()));
		return filteredByWord
	}

	filterByColor(products: Product[]): Product[] {
		let filteredByColor: Product[] = [];
		this.filterColor.forEach(color => {
			filteredByColor.push(...products.filter(p => p.color === color))
		})
		return filteredByColor
	}

	filterBySize(products: Product[]): Product[] {
		let filteredBySize: Product[] = [];
		this.filterSize.forEach(size => {
			filteredBySize.push(... products.filter(p => p.size === size))
		})
		return filteredBySize
	}

	filterProducts() {
		this.selectAllItems(true);
		this.searchWord = this.localStorageService.get('searchWord')
		let filteredProducts = this.allProducts;

			if (this.searchWord !== 'Todos') {
				filteredProducts = this.filterByWord(filteredProducts)
			}
	
			if (this.filterColor.length > 0) {
				filteredProducts = this.filterByColor(filteredProducts)
			}
	
			if (this.filterSize.length > 0) {
				filteredProducts = this.filterBySize(filteredProducts)
			}
	
			return  this.products = filteredProducts
	}

	addFavorite(item: Product) {
		this.favoriteService.addFavorite(item);
		this.getFavorites();
	}

	selectAllItems(filter?: boolean) {
		if (this.selectedItems.length === this.products.length || filter) { this.selectedItems = []; }
		else { this.selectedItems = []; this.selectedItems.push( ...this.products); } 
	}

	selectedItemsCheck(id: number) {
		if(this.selectedItems.find(f => f.id === id)) return true
		return false
	}

	addItemSelected(item: Product) {
		if(this.selectedItems.find(f => f.id === item.id)) this.selectedItems.splice(this.selectedItems.findIndex(f => f.id === item.id), 1)
		else this.selectedItems.push(item);
	}

	addAllSelected() {
		this.selectedItems.forEach(item => {
			this.addItemCart(item)
		})
		this.selectedItems = [];
	}
}
