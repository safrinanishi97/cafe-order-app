import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { OrderService } from '../../services/order';
import { Order } from '../../models/order.model';
import {
  Food,
  FoodCategory,
  FoodVariant,
} from '../../models/food.model';

import { FOOD_ITEMS } from '../../data/food-data';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [],
  templateUrl: './edit-order.html',
  styleUrl: './edit-order.scss',
})
export class EditOrder {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly orderService = inject(OrderService);
  private readonly toastService = inject(ToastService);


  // =========================
  // FOOD
  // =========================

  protected readonly foodItems: Food[] = FOOD_ITEMS;


  // =========================
  // ORDER
  // =========================

  protected readonly order: Order | undefined =
    this.getOrder();


  private getOrder(): Order | undefined {

    const orderId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    return this.orderService
      .orders()
      .find(order => order.id === orderId);
  }


  // =========================
  // LOCATION
  // =========================

  protected readonly selectedSection =
    signal<'indoor' | 'outdoor' | ''>(
      this.order?.section ?? ''
    );


  protected readonly selectedTable =
    signal<number | null>(
      this.order?.tableNumber ?? null
    );


  protected readonly indoorTables =
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


  protected readonly outdoorTables =
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


  // =========================
  // CATEGORY
  // =========================

  protected readonly selectedCategory =
    signal<FoodCategory>('classic-burger');


  protected readonly categories: {
    value: FoodCategory;
    label: string;
  }[] = [

    {
      value: 'classic-burger',
      label: 'Classic Burger',
    },

    {
      value: 'mini-burger',
      label: 'Mini Burger',
    },

    {
      value: 'pizza',
      label: 'Pizza',
    },

    {
      value: 'pasta',
      label: 'Pasta',
    },

    {
      value: 'chowmein',
      label: 'Chowmein',
    },

    {
      value: 'rice-bowl',
      label: 'Rice Bowl',
    },

    {
      value: 'meat-box',
      label: 'Meat Box',
    },

    {
      value: 'wings',
      label: 'Wings',
    },

    {
      value: 'drinks',
      label: 'Drinks',
    },

  ];


  protected readonly filteredFoodItems =
    computed(() =>
      this.foodItems.filter(
        food =>
          food.category === this.selectedCategory()
      )
    );


  protected selectCategory(
    category: FoodCategory
  ): void {

    this.selectedCategory.set(category);
  }


  // =========================
  // QUANTITY
  // =========================

  protected readonly quantities =
    signal<Record<string, number>>(
      this.createInitialQuantities()
    );


  private createInitialQuantities():
    Record<string, number> {

    if (!this.order) {
      return {};
    }

    const result: Record<string, number> = {};

    for (const item of this.order.items) {

      const key =
        this.getQuantityKey(
          item.foodId,
          item.variantId
        );

      result[key] = item.quantity;
    }

    return result;
  }


  protected getQuantityKey(
    foodId: number,
    variantId?: string
  ): string {

    return variantId
      ? `${foodId}_${variantId}`
      : `${foodId}`;
  }


  protected getQuantity(
    foodId: number,
    variantId?: string
  ): number {

    return (
      this.quantities()[
        this.getQuantityKey(
          foodId,
          variantId
        )
      ] ?? 0
    );
  }


  protected increaseQuantity(
    foodId: number,
    variantId?: string
  ): void {

    const key =
      this.getQuantityKey(
        foodId,
        variantId
      );

    const currentQuantity =
      this.getQuantity(
        foodId,
        variantId
      );

    this.quantities.update(current => ({
      ...current,
      [key]: currentQuantity + 1,
    }));
  }


  protected decreaseQuantity(
    foodId: number,
    variantId?: string
  ): void {

    const currentQuantity =
      this.getQuantity(
        foodId,
        variantId
      );

    const minimumQuantity =
      this.getServedQuantity(
        foodId,
        variantId
      );

    if (currentQuantity <= minimumQuantity) {
      return;
    }

    const key =
      this.getQuantityKey(
        foodId,
        variantId
      );

    this.quantities.update(current => ({
      ...current,
      [key]: currentQuantity - 1,
    }));
  }

  protected getServedQuantity(
    foodId: number,
    variantId?: string
  ): number {

    const existingItem =
      this.order?.items.find(item =>
        item.foodId === foodId &&
        item.variantId === variantId
      );

    return existingItem?.servedQuantity ?? 0;
  }

  // =========================
  // FOOD PRICE
  // =========================

  protected getFoodPrice(
    food: Food
  ): number {

    return food.price ?? 0;
  }


  protected getVariantPrice(
    variant: FoodVariant
  ): number {

    return variant.price;
  }


  // =========================
  // SELECTED FOOD COUNT
  // =========================

  protected readonly totalQuantity =
    computed(() => {

      return this.foodItems.reduce(
        (total, food) => {

          if (food.variants?.length) {

            return total +
              food.variants.reduce(
                (
                  variantTotal,
                  variant
                ) =>
                  variantTotal +
                  this.getQuantity(
                    food.id,
                    variant.id
                  ),
                0
              );
          }

          return total +
            this.getQuantity(food.id);

        },
        0
      );
    });


  // =========================
  // ORDER TOTAL
  // =========================

  protected readonly orderTotal =
    computed(() => {

      return this.foodItems.reduce(
        (total, food) => {

          if (food.variants?.length) {

            return total +
              food.variants.reduce(
                (
                  variantTotal,
                  variant
                ) =>
                  variantTotal +
                  (
                    this.getQuantity(
                      food.id,
                      variant.id
                    ) *
                    variant.price
                  ),
                0
              );
          }

          return total +
            (
              this.getQuantity(food.id) *
              (food.price ?? 0)
            );

        },
        0
      );
    });


  // =========================
  // LOCATION
  // =========================

  protected onSectionChange(
    event: Event
  ): void {

    const selectElement =
      event.target as HTMLSelectElement;

    const value =
      selectElement.value;

    if (
      value === 'indoor' ||
      value === 'outdoor'
    ) {

      this.selectedSection.set(value);

    } else {

      this.selectedSection.set('');
    }

    this.selectedTable.set(null);
  }


  protected onTableChange(
    event: Event
  ): void {

    const selectElement =
      event.target as HTMLSelectElement;

    const value =
      Number(selectElement.value);

    this.selectedTable.set(
      value > 0
        ? value
        : null
    );
  }


  // =========================
  // UPDATE VALIDATION
  // =========================

  protected canUpdateOrder(): boolean {

    return (
      this.totalQuantity() > 0 &&
      this.selectedSection() !== '' &&
      this.selectedTable() !== null &&
      !this.hasInvalidServedQuantity()
    );
  }

  protected hasInvalidServedQuantity(): boolean {

    if (!this.order) {
      return false;
    }

    return this.order.items.some(item => {

      const newQuantity = this.getQuantity(
        item.foodId,
        item.variantId
      );

      return newQuantity < item.servedQuantity;
    });
  }

  // =========================
  // UPDATE ORDER
  // =========================

  protected updateOrder(): void {

    if (!this.order) {
      return;
    }

    if (this.hasInvalidServedQuantity()) {

      this.toastService.error(
        'Order quantity cannot be less than the already served quantity.'
      );

      return;
    }
    const section =
      this.selectedSection();


    if (section === '') {
      return;
    }


    const tableNumber =
      this.selectedTable();


    if (tableNumber === null) {
      return;
    }


    if (this.totalQuantity() === 0) {
      return;
    }


    const orderItems =
      this.foodItems.flatMap(food => {

        // =========================
        // FOOD WITH VARIANTS
        // =========================

        if (food.variants?.length) {

          return food.variants
            .filter(
              variant =>
                this.getQuantity(
                  food.id,
                  variant.id
                ) > 0
            )
            .map(variant => {

              const quantity =
                this.getQuantity(
                  food.id,
                  variant.id
                );

              return {
                foodId: food.id,
                foodName: food.name,

                quantity,

                price: variant.price,

                variantId: variant.id,
                variantName: variant.name,

                servedQuantity:
                this.getExistingServedQuantity(
                  food.id,
                  variant.id
                ),
              };

            });
        }


        // =========================
        // FOOD WITHOUT VARIANT
        // =========================

        const quantity =
          this.getQuantity(food.id);


        if (quantity === 0) {
          return [];
        }


        return [{
          foodId: food.id,
          foodName: food.name,

          quantity,

          price: food.price ?? 0,

          servedQuantity:
            this.getExistingServedQuantity(
              food.id,
              undefined
            ),
        }];
      });


    const updatedOrder: Order = {

      ...this.order,

      section,

      tableNumber,

      items: orderItems,

    };


    this.orderService.updateOrder(
      updatedOrder
    );


    this.toastService.success(
      `Order #${updatedOrder.orderNumber} updated successfully.`
    );


    this.router.navigate([
      '/orders',
      updatedOrder.id,
    ]);
  }


  // =========================
  // EXISTING SERVED QUANTITY
  // =========================

  private getExistingServedQuantity(
    foodId: number,
    variantId: string | undefined
  ): number {

    const existingItem =
      this.order?.items.find(item =>
        item.foodId === foodId &&
        item.variantId === variantId
      );

    return existingItem?.servedQuantity ?? 0;
  }

  // =========================
  // BACK
  // =========================

  protected goBack(): void {

    this.router.navigate([
      '/orders',
      this.order?.id,
    ]);
  }


  // =========================
  // TABLE OCCUPANCY
  // =========================

  protected isTableOccupied(
    tableNumber: number
  ): boolean {

    const section =
      this.selectedSection();


    if (section === '') {
      return false;
    }


    if (
      this.order?.section === section &&
      this.order?.tableNumber === tableNumber
    ) {
      return false;
    }


    return this.orderService
      .orders()
      .some(order =>
        order.id !== this.order?.id &&
        order.status === 'active' &&
        order.section === section &&
        order.tableNumber === tableNumber
      );
  }

}