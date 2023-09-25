import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../shared/services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
	searchWord = ''
	constructor(private router: Router, private localStorageService: LocalStorageService) { }

	navigation(url: string) {
		this.router.navigate([url])
	}

	setSearchWord(event: any) {
		this.searchWord = event?.target?.value || ''
		this.localStorageService.set('searchWord', this.searchWord)
	}
}
