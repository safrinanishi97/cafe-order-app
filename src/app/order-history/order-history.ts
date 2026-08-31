import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order';
import { Order } from '../models/order.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './order-history.html',
  styleUrl: './order-history.scss',
})
export class OrderHistory {

  private readonly router = inject(Router);
  private readonly orderService = inject(OrderService);

  protected readonly orders = this.orderService.historyOrders;
  protected readonly searchTerm = signal('');

  protected readonly selectedStatus =
    signal<'all' | 'served' | 'cancelled'>('all');
    
  
  protected readonly filteredOrders = computed(() => {

    const search = this.searchTerm()
      .trim()
      .toLowerCase();

    const status = this.selectedStatus();

    return this.orders().filter(order => {

      const matchesSearch =
        search === '' ||
        order.orderNumber.toString().includes(search);

      const matchesStatus =
        status === 'all' ||
        order.status === status;

      return matchesSearch && matchesStatus;
    });
  });
  
  protected goBack(): void {
    this.router.navigate(['/']);
  }

  protected openOrder(orderId: number): void {
    this.router.navigate(['/orders', orderId]);
  }

  protected getTotalQuantity(order: Order): number {
    return order.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  protected getOrderTotal(order: Order): number {
    return order.items.reduce(
        (total, item) =>
          total + (item.price * item.quantity),
        0
      );
    }

    protected onSearchChange(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    this.searchTerm.set(input.value);
  }

  protected onStatusChange( status: 'all' | 'served' | 'cancelled'): void {
    this.selectedStatus.set(status);
  }
}