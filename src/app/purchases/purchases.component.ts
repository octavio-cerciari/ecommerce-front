import { Component, OnInit } from '@angular/core';
import { Cart } from '../shared/model/cart';
import { PurchasesService } from '../shared/services/purchases-service/purchases.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.sass']
})
export class PurchasesComponent implements OnInit{
	constructor(private purchasesService: PurchasesService) {}
	purchases: Cart[] = this.purchasesService.getPurchases();
	ngOnInit(): void {
		
	}
}
