import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home')
        .then(component => component.Home)
  },
  {
    path: 'orders/new',
    loadComponent: () =>
      import('./orders/new-order/new-order')
        .then(component => component.NewOrder)
  },
  {
    path: 'orders/:id/edit',
    loadComponent: () =>
      import('./orders/edit-order/edit-order')
        .then(m => m.EditOrder),
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./order-details/order-details')
        .then(m => m.OrderDetails),
  },
  {
    path: 'order-history',
    loadComponent: () =>
      import('./order-history/order-history')
        .then(component => component.OrderHistory),
  },
];