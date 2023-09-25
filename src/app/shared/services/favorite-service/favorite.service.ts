import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { Product } from '../../model/product';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private localStorageService: LocalStorageService) { }

  getFavorites() {
	return this.localStorageService.get('favorites')?.favorites;
  }
  addFavorite(item: Product) {
	let favorites: any[] = []
	let favoritesold = this.getFavorites();
	if (favoritesold) {favorites.push(... favoritesold)}
	let existentItem = favorites.filter((element: any) => item.id === element)
	if(existentItem.length === 0) favorites.push(item.id)
	else { favorites.splice(favorites.findIndex((element: any) => item.id === element), 1)  }
	return this.localStorageService.set('favorites', { favorites } )
  }


}
