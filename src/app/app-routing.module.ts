import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { PurchasesComponent } from './purchases/purchases.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'cart', component: CartComponent },
	{ path: 'search', component: SearchComponent },
	{ path: 'purchases', component: PurchasesComponent },
	{ path: '**', redirectTo: '/home' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
