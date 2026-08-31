import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { Router } from '@angular/router';

import { OrderService } from '../../services/order';
import { Order, OrderItem } from '../../models/order.model';
import {
  Food,
  FoodCategory,
  FoodVariant,
} from '../../models/food.model';

import { FOOD_ITEMS } from '../../data/food-data';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [],
  templateUrl: './new-order.html',
  styleUrl: './new-order.scss',
})
export class NewOrder {

  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  protected readonly foodItems: Food[] = FOOD_ITEMS;

  protected readonly selectedSection =
  signal<'indoor' | 'outdoor' | ''>('');

  protected readonly selectedTable =
  signal<number | null>(null);

  protected readonly indoorTables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  protected readonly outdoorTables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  protected readonly selectedCategory =
    signal<FoodCategory>('classic-burger');

  protected readonly selectedVariants =
    signal<Record<number, string>>({});

  protected readonly quantities =
    signal<Record<string, number>>({});


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


  protected onSectionChange(event: Event): void {

    const selectElement =
      event.target as HTMLSelectElement;

    const value = selectElement.value;

    if (value === 'indoor' || value === 'outdoor') {

      this.selectedSection.set(value);

    } else {

      this.selectedSection.set('');
    }

    this.selectedTable.set(null);
  }

  protected onTableChange(event: Event): void {

    const selectElement =
      event.target as HTMLSelectElement;

    const value = Number(selectElement.value);

    this.selectedTable.set(
      value > 0 ? value : null
    );
  }

  protected getSelectedVariant(
    food: Food
  ): FoodVariant | undefined {

    if (!food.variants?.length) {
      return undefined;
    }

    const selectedVariantId =
      this.selectedVariants()[food.id];

    return (
      food.variants.find(
        variant =>
          variant.id === selectedVariantId
      ) ??
      food.variants[0]
    );
  }


  protected selectVariant(
    foodId: number,
    variantId: string
  ): void {

    this.selectedVariants.update(current => ({
      ...current,
      [foodId]: variantId,
    }));
  }


  protected getQuantity(
    foodId: number,
    variantId?: string
  ): number {

    return (
      this.quantities()[
        this.getQuantityKey(foodId, variantId)
      ] ?? 0
    );
  }

  protected getQuantityKey(
    foodId: number,
    variantId?: string
  ): string {

    return variantId
      ? `${foodId}_${variantId}`
      : `${foodId}`;
  }

  protected increaseQuantity(
    foodId: number,
    variantId?: string
  ): void {

    const key =
      this.getQuantityKey(foodId, variantId);

    const currentQuantity =
      this.getQuantity(foodId, variantId);

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
      this.getQuantity(foodId, variantId);

    if (currentQuantity === 0) {
      return;
    }

    const key =
      this.getQuantityKey(foodId, variantId);

    this.quantities.update(current => ({
      ...current,
      [key]: currentQuantity - 1,
    }));
  }


  protected getFoodPrice(
    food: Food
  ): number {

    if (food.variants?.length) {

      return (
        this.getSelectedVariant(food)?.price
        ?? 0
      );
    }

    return food.price ?? 0;
  }

  protected getSelectedFoodCount(): number {

    return this.foodItems.reduce(
      (total, food) => {

        if (food.variants?.length) {

          return total +
            food.variants.reduce(
              (variantTotal, variant) =>
                variantTotal +
                this.getQuantity(
                  food.id,
                  variant.id
                ),
              0
            );
        }

        return total + this.getQuantity(food.id);
      },
      0
    );
  }


  protected canSaveOrder(): boolean {
    return (
      this.getSelectedFoodCount() > 0 &&
      this.selectedSection() !== '' &&
      this.selectedTable() !== null
    );
  }


  protected saveOrder(): void {

    if (!this.canSaveOrder()) {
      return;
    }

    const section = this.selectedSection();

    if (section === '') {
      return;
    }

    const tableNumber = this.selectedTable();

    if (tableNumber === null) {
      return;
    }

    const orderItems: OrderItem[] =
      this.foodItems.flatMap(food => {

        if (food.variants?.length) {

          return food.variants
            .filter(
              variant =>
                this.getQuantity(
                  food.id,
                  variant.id
                ) > 0
            )
            .map(variant => ({
                foodId: food.id,
                foodName: food.name,

                quantity: this.getQuantity(
                  food.id,
                  variant.id
                ),

                price: variant.price,

                variantId: variant.id,
                variantName: variant.name,

                servedQuantity: 0,
              }));
        }

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

          servedQuantity: 0,
        }];
      });


    const order: Order = {

      id: Date.now(),

      orderNumber:
        this.orderService.getNextOrderNumber(),

      section,

      tableNumber,

      items: orderItems,

      createdAt:
        new Date().toISOString(),

      status: 'active',
    };


    this.orderService.saveOrder(order);

    this.toastService.success(
      `Order #${order.orderNumber} saved successfully.`
    );

    this.router.navigate(['/']);
  }


  protected goBack(): void {

    this.router.navigate(['/']);
  }

  protected readonly orderTotal = computed(() => {

    return this.foodItems.reduce(
      (total, food) => {

        if (food.variants?.length) {

          return total +
            food.variants.reduce(
              (variantTotal, variant) =>
                variantTotal +
                (
                  this.getQuantity(
                    food.id,
                    variant.id
                  ) * variant.price
                ),
              0
            );
        }

        const quantity =
          this.getQuantity(food.id);

        return total +
          (food.price ?? 0) * quantity;
      },
      0
    );
  });
  
  protected isTableOccupied(tableNumber: number): boolean {

    const section = this.selectedSection();

    if (section === '') {
      return false;
    }

    return this.orderService.isTableOccupied(
      section,
      tableNumber
    );
  }
}