import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order';
import { Order } from '../models/order.model';
import { TitleCasePipe } from '@angular/common';
import { AuthService } from '../services/auth';

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
  private readonly authService = inject(AuthService);

  protected readonly orders = this.orderService.activeOrders;

  protected readonly selectedSection = signal<'all' | 'indoor' | 'outdoor'>('all');

  protected readonly selectedTable = signal<number | 'all'>('all');

  protected readonly searchTerm = signal('');

  protected readonly indoorTables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  protected readonly outdoorTables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  protected readonly filteredOrders = computed(() => {

    const section = this.selectedSection();
    const table = this.selectedTable();
    const searchTerm = this.searchTerm().trim().toLowerCase();

    return this.orders().filter(order => {

      const sectionMatches =
        section === 'all' ||
        order.section === section;

      const tableMatches =
        table === 'all' ||
        order.tableNumber === table;

      const searchableOrder = [
        order.orderNumber,
        order.tableNumber,
        order.section,
        ...order.items.flatMap(item => [item.foodName, item.variantName ?? '']),
      ]
        .join(' ')
        .toLowerCase();

      const searchMatches =
        searchTerm === '' ||
        searchableOrder.includes(searchTerm);

      return sectionMatches && tableMatches && searchMatches;
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

  protected logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
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

  protected onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.searchTerm.set(inputElement.value);
  }

  protected getHighlightedText(
    value: string | number
  ): Array<{ text: string; matched: boolean }> {
    const text = String(value);
    const searchTerm = this.searchTerm().trim();

    if (searchTerm === '') {
      return [{ text, matched: false }];
    }

    const normalizedText = text.toLowerCase();
    const normalizedSearchTerm = searchTerm.toLowerCase();
    const segments: Array<{ text: string; matched: boolean }> = [];
    let startIndex = 0;
    let matchIndex = normalizedText.indexOf(normalizedSearchTerm);

    while (matchIndex !== -1) {
      if (matchIndex > startIndex) {
        segments.push({
          text: text.slice(startIndex, matchIndex),
          matched: false,
        });
      }

      segments.push({
        text: text.slice(matchIndex, matchIndex + searchTerm.length),
        matched: true,
      });

      startIndex = matchIndex + searchTerm.length;
      matchIndex = normalizedText.indexOf(normalizedSearchTerm, startIndex);
    }

    if (startIndex < text.length) {
      segments.push({ text: text.slice(startIndex), matched: false });
    }

    return segments.length > 0 ? segments : [{ text, matched: false }];
  }
}