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
		// this.productService.getProductsList().subscribe((products: Product[]) => {
		// 	this.products = products;
		// 	this.allProducts = products;
		// });

		this.products = this.allProducts = [
			{
				"id": 1,
				"description": "Camiseta Vermelha",
				"size": 'GG',
				"color": 'vermelho',
				"photo": 'red-shirt.png',
				"longDescription": "LemonChiffon T-shirt Repellendus eligendi assumenda corrupti optio omnis ut. At distinctio quam illum incidunt suscipit dolorem. Porro dolores vel harum praesentium perferendis impedit dolor repellendus.",
				"price": 330.96
			},
			{
				"id": 2,
				"description": "Camiseta Vermelha",
				"size": 'P',
				"color": 'vermelho',
				"photo": 'red-shirt.png',
				"longDescription": "LemonChiffon T-shirt Repellendus eligendi assumenda corrupti optio omnis ut. At distinctio quam illum incidunt suscipit dolorem. Porro dolores vel harum praesentium perferendis impedit dolor repellendus.",
				"price": 330.96
			},
			{
				"id": 3,
				"description": "Camiseta Vermelha",
				"size": 'M',
				"color": 'vermelho',
				"photo": 'red-shirt.png',
				"longDescription": "LemonChiffon T-shirt Repellendus eligendi assumenda corrupti optio omnis ut. At distinctio quam illum incidunt suscipit dolorem. Porro dolores vel harum praesentium perferendis impedit dolor repellendus.",
				"price": 330.96
			},
			{
				"id": 4,
				"description": "Camiseta Verde",
				"size": 'M',
				"color": 'verde',
				"photo": 'green-shirt.png',
				"longDescription": "DarkGreen T-shirt Vitae omnis neque consequatur illo repellat quaerat doloribus. At ab iure modi et autem. Dolor ex eveniet architecto aut est. Est veritatis nostrum incidunt dolorum et eum. Culpa et voluptatem accusamus id debitis voluptates magnam molestiae.",
				"price": 386.22
			},
			{
				"id": 5,
				"description": "Camiseta Verde",
				"size": 'G',
				"color": 'verde',
				"photo": 'green-shirt.png',
				"longDescription": "DarkGreen T-shirt Vitae omnis neque consequatur illo repellat quaerat doloribus. At ab iure modi et autem. Dolor ex eveniet architecto aut est. Est veritatis nostrum incidunt dolorum et eum. Culpa et voluptatem accusamus id debitis voluptates magnam molestiae.",
				"price": 386.22
			},
			{
				"id": 6,
				"description": "Camiseta Verde",
				"size": 'P',
				"color": 'verde',
				"photo": 'green-shirt.png',
				"longDescription": "DarkGreen T-shirt Vitae omnis neque consequatur illo repellat quaerat doloribus. At ab iure modi et autem. Dolor ex eveniet architecto aut est. Est veritatis nostrum incidunt dolorum et eum. Culpa et voluptatem accusamus id debitis voluptates magnam molestiae.",
				"price": 386.22
			},
			{
				"id": 7,
				"description": "Camiseta Azul",
				"size": 'GG',
				"color": 'azul',
				"photo": 'blue-shirt.png',
				"longDescription": "HoneyDew T-shirt Voluptatem nihil assumenda ut. Optio labore consequatur iusto qui nam corporis. Assumenda neque molestias voluptatem doloribus molestias ut quibusdam velit. Omnis quia occaecati officiis non laborum quo unde. Voluptatem ut consequatur consequatur dolore praesentium fugit.",
				"price": 293.42
			},
			{
				"id": 8,
				"description": "Camiseta Azul",
				"size": 'P',
				"color": 'azul',
				"photo": 'blue-shirt.png',
				"longDescription": "HoneyDew T-shirt Voluptatem nihil assumenda ut. Optio labore consequatur iusto qui nam corporis. Assumenda neque molestias voluptatem doloribus molestias ut quibusdam velit. Omnis quia occaecati officiis non laborum quo unde. Voluptatem ut consequatur consequatur dolore praesentium fugit.",
				"price": 293.42
			}
		]
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
