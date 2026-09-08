export interface OrderItem {
  foodId: number;
  foodName: string;
  quantity: number;
  price: number;
  variantId?: string;
  variantName?: string;

  servedQuantity: number;
}

export type OrderSection = 'indoor' | 'outdoor';

export interface Order {
  id: number;
  orderNumber: number;

  section: OrderSection;
  tableNumber: number;

  items: OrderItem[];
  createdAt: string;
  status: 'active' | 'served' | 'cancelled';

  // True once the cook has been told to prepare this order.
  isCooking?: boolean;
}