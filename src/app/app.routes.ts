import { Routes } from '@angular/router';
import { HomeComponent } from '../app/pages/home';
import { MenuComponent } from './pages/menu';
import { CartComponent } from './pages/cart';
import { PizzaDetailComponent } from './pages/pizza-detail';



export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'cart', component: CartComponent },
  { path: 'pizze/:id', component: PizzaDetailComponent },

  { path: '**', redirectTo: '404' },
];
