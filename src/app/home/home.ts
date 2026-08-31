import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order';
import { Order } from '../models/order.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  private readonly router = inject(Router);
  private readonly orderService = inject(OrderService);

  protected readonly orders = this.orderService.activeOrders;

  protected readonly selectedSection = signal<'all' | 'indoor' | 'outdoor'>('all');

  protected readonly selectedTable = signal<number | 'all'>('all');

  protected readonly indoorTables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  protected readonly outdoorTables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  protected readonly filteredOrders = computed(() => {

    const section = this.selectedSection();
    const table = this.selectedTable();

    return this.orders().filter(order => {

      const sectionMatches =
        section === 'all' ||
        order.section === section;

      const tableMatches =
        table === 'all' ||
        order.tableNumber === table;

      return sectionMatches && tableMatches;
    });
  });

  protected createNewOrder(): void {
    this.router.navigate(['/orders/new']);
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

  protected openOrder(orderId: number): void {
    this.router.navigate(['/orders', orderId]);
  }

  protected openHistory(): void {
    this.router.navigate(['/order-history']);
  }

  protected onSectionChange( section: 'all' | 'indoor' | 'outdoor'): void {

    this.selectedSection.set(section);

    this.selectedTable.set('all');
  }

  protected onTableFilterChange(event: Event): void {

    const selectElement =
      event.target as HTMLSelectElement;

    const value = selectElement.value;

    if (value === 'all') {

      this.selectedTable.set('all');

      return;
    }

    this.selectedTable.set(Number(value));
  }
}