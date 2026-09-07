import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login')
        .then(component => component.Login),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./home/home')
        .then(component => component.Home)
  },
  {
    path: 'orders/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./orders/new-order/new-order')
        .then(component => component.NewOrder)
  },
  {
    path: 'orders/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./orders/edit-order/edit-order')
        .then(m => m.EditOrder),
  },
  {
    path: 'orders/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./order-details/order-details')
        .then(m => m.OrderDetails),
  },
  {
    path: 'order-history',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./order-history/order-history')
        .then(component => component.OrderHistory),
  },
];