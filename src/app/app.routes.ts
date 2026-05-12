
import { Routes } from '@angular/router';
import { CatalogoComponent } from './components/catalogo/catalogo';
import { CarritoComponent } from './components/carrito/carrito';
import { CheckoutComponent } from '../frontend/components/checkout/checkout';
import { MisPedidosComponent } from './components/mis-pedidos/mis-pedidos';

export const routes: Routes = [
  { path: '', component: CatalogoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'mis-pedidos', component: MisPedidosComponent },
  { path: '**', redirectTo: '' },
];
