import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import {
  Order,
  OrderItem,
} from '../models/order.model';

import { OrderService } from '../services/order';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './order-details.html',
  styleUrl: './order-details.scss',
})
export class OrderDetails {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly orderService = inject(OrderService);


  // =========================
  // DIALOGS
  // =========================

  protected readonly showCancelDialog =
    signal(false);

  protected readonly showCompleteDialog =
    signal(false);


  // =========================
  // ORDER
  // =========================

  protected readonly order =
    computed<Order | undefined>(() => {

      const orderId = Number(
        this.route.snapshot.paramMap.get('id')
      );

      return this.orderService
        .orders()
        .find(order => order.id === orderId);
    });


  // =========================
  // ORDER TOTAL
  // =========================

  protected readonly orderTotal =
    computed(() => {

      const currentOrder = this.order();

      if (!currentOrder) {
        return 0;
      }

      return currentOrder.items.reduce(
        (total, item) =>
          total +
          (item.price * item.quantity),
        0
      );
    });


  // =========================
  // ALL ITEMS SERVED
  // =========================

  protected readonly areAllItemsDone =
    computed(() => {

      const currentOrder = this.order();

      if (
        !currentOrder ||
        currentOrder.items.length === 0
      ) {
        return false;
      }

      return currentOrder.items.every(
        item =>
          this.getServedQuantity(item) >=
          item.quantity
      );
    });


  // =========================
  // BACK
  // =========================

  protected goBack(): void {

    this.router.navigate(['/']);
  }


  // =========================
  // ITEM TOTAL
  // =========================

  protected getItemTotal(
    item: OrderItem
  ): number {

    return item.price * item.quantity;
  }


  // =========================
  // SERVED QUANTITY
  // =========================

  protected getServedQuantity(
    item: OrderItem
  ): number {

    return item.servedQuantity ?? 0;
  }


  // =========================
  // REMAINING QUANTITY
  // =========================

  protected getRemainingQuantity(
    item: OrderItem
  ): number {

    return Math.max(
      item.quantity -
      this.getServedQuantity(item),
      0
    );
  }


  // =========================
  // ITEM DONE
  // =========================

  protected isItemDone(
    item: OrderItem
  ): boolean {

    return (
      this.getRemainingQuantity(item) === 0
    );
  }


  // =========================
  // SERVE +1
  // =========================

  protected serveOneItem(
    itemIndex: number
  ): void {

    const currentOrder = this.order();

    if (!currentOrder) {
      return;
    }


    const updatedItems =
      currentOrder.items.map(
        (item, index) => {

          if (index !== itemIndex) {
            return item;
          }


          const servedQuantity =
            this.getServedQuantity(item);


          const remainingQuantity =
            this.getRemainingQuantity(item);


          // Already fully served
          if (remainingQuantity <= 0) {
            return item;
          }


          return {
            ...item,

            servedQuantity:
              servedQuantity + 1,
          };

        }
      );


    const updatedOrder: Order = {
      ...currentOrder,

      items: updatedItems,
    };


    this.orderService.updateOrder(
      updatedOrder
    );
  }


  // =========================
  // UNDO ALL
  // =========================

  protected undoAll(
    itemIndex: number
  ): void {

    const currentOrder = this.order();

    if (!currentOrder) {
      return;
    }


    const updatedItems =
      currentOrder.items.map(
        (item, index) => {

          if (index !== itemIndex) {
            return item;
          }


          const servedQuantity =
            this.getServedQuantity(item);


          // Nothing served
          if (servedQuantity <= 0) {
            return item;
          }


          return {
            ...item,

            servedQuantity: 0,
          };

        }
      );


    const updatedOrder: Order = {
      ...currentOrder,

      items: updatedItems,
    };


    this.orderService.updateOrder(
      updatedOrder
    );
  }


  // =========================
  // COMPLETE ORDER
  // =========================

  protected openCompleteDialog(): void {

    if (!this.areAllItemsDone()) {
      return;
    }

    this.showCompleteDialog.set(true);
  }


  protected closeCompleteDialog(): void {

    this.showCompleteDialog.set(false);
  }


  protected confirmCompleteOrder(): void {

    const currentOrder = this.order();

    if (!currentOrder) {
      return;
    }


    if (!this.areAllItemsDone()) {
      return;
    }


    this.orderService.updateOrderStatus(
      currentOrder.id,
      'served'
    );


    this.showCompleteDialog.set(false);

    this.router.navigate(['/']);
  }


  // =========================
  // CANCEL ORDER
  // =========================

  protected openCancelDialog(): void {

    this.showCancelDialog.set(true);
  }


  protected closeCancelDialog(): void {

    this.showCancelDialog.set(false);
  }


  protected confirmCancelOrder(): void {

    const currentOrder = this.order();

    if (!currentOrder) {
      return;
    }


    this.orderService.updateOrderStatus(
      currentOrder.id,
      'cancelled'
    );


    this.showCancelDialog.set(false);

    this.router.navigate(['/']);
  }


  // =========================
  // EDIT ORDER
  // =========================

  protected editOrder(): void {

    const currentOrder = this.order();

    if (!currentOrder) {
      return;
    }


    this.router.navigate([
      '/orders',
      currentOrder.id,
      'edit',
    ]);
  }
}