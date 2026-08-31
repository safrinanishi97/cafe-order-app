import {
  computed,
  Injectable,
  signal,
} from '@angular/core';

import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private readonly storageKey =
    'cafetoria-orders';


  // =========================
  // ORDERS
  // =========================

  private readonly ordersSignal =
    signal<Order[]>(
      this.loadOrders()
    );


  readonly orders =
    this.ordersSignal.asReadonly();


  // =========================
  // ACTIVE ORDERS
  // =========================

  readonly activeOrders =
    computed(() =>
      this.ordersSignal().filter(
        order =>
          order.status === 'active'
      )
    );


  // =========================
  // HISTORY ORDERS
  // =========================

  readonly historyOrders =
    computed(() =>
      this.ordersSignal()
        .filter(
          order =>
            order.status === 'served' ||
            order.status === 'cancelled'
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        )
    );


  // =========================
  // LOAD ORDERS
  // =========================

  private loadOrders(): Order[] {

    const storedOrders =
      localStorage.getItem(
        this.storageKey
      );


    if (!storedOrders) {
      return [];
    }


    try {

      const orders =
        JSON.parse(
          storedOrders
        ) as Order[];


      return orders.map(
        order => ({
          ...order,

          items: order.items.map(
            item => ({
              ...item,

              // Backward compatibility:
              // old orders may not have servedQuantity.
              servedQuantity:
                Math.min(
                  item.servedQuantity ?? 0,
                  item.quantity
                ),
            })
          ),
        })
      );

    } catch {

      return [];
    }
  }


  // =========================
  // SAVE ORDER
  // =========================

  saveOrder(order: Order): void {

    const normalizedOrder =
      this.normalizeOrder(order);


    const updatedOrders = [
      ...this.ordersSignal(),
      normalizedOrder,
    ];


    this.ordersSignal.set(
      updatedOrders
    );


    this.saveToStorage(
      updatedOrders
    );
  }


  // =========================
  // UPDATE ORDER
  // =========================

  updateOrder(
    updatedOrder: Order
  ): void {

    const normalizedOrder =
      this.normalizeOrder(
        updatedOrder
      );


    const updatedOrders =
      this.ordersSignal().map(
        order =>
          order.id ===
          normalizedOrder.id
            ? normalizedOrder
            : order
      );


    this.ordersSignal.set(
      updatedOrders
    );


    this.saveToStorage(
      updatedOrders
    );
  }


  // =========================
  // UPDATE ORDER STATUS
  // =========================

  updateOrderStatus(
    orderId: number,
    status: Order['status']
  ): void {

    const updatedOrders =
      this.ordersSignal().map(
        order =>
          order.id === orderId
            ? {
                ...order,
                status,
              }
            : order
      );


    this.ordersSignal.set(
      updatedOrders
    );


    this.saveToStorage(
      updatedOrders
    );
  }


  // =========================
  // NEXT ORDER NUMBER
  // =========================

  getNextOrderNumber(): number {

    const orders =
      this.ordersSignal();


    if (orders.length === 0) {
      return 1;
    }


    return (
      Math.max(
        ...orders.map(
          order =>
            order.orderNumber
        )
      ) + 1
    );
  }


  // =========================
  // TABLE OCCUPANCY
  // =========================

  isTableOccupied(
    section:
      | 'indoor'
      | 'outdoor',

    tableNumber: number
  ): boolean {

    return this.activeOrders().some(
      order =>
        order.section === section &&
        order.tableNumber === tableNumber
    );
  }


  // =========================
  // NORMALIZE ORDER
  // =========================

  private normalizeOrder(
    order: Order
  ): Order {

    return {

      ...order,

      items:
        order.items.map(
          item => {

            const quantity =
              Math.max(
                item.quantity,
                0
              );


            const servedQuantity =
              Math.min(
                Math.max(
                  item.servedQuantity ?? 0,
                  0
                ),
                quantity
              );


            return {
              ...item,

              quantity,

              servedQuantity,
            };
          }
        ),
    };
  }


  // =========================
  // LOCAL STORAGE
  // =========================

  private saveToStorage(
    orders: Order[]
  ): void {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(orders)
    );
  }
}
