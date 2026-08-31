export type FoodCategory =
  | 'classic-burger'
  | 'mini-burger'
  | 'pizza'
  | 'pasta'
  | 'chowmein'
  | 'meat-box'
  | 'wings'
  | 'rice-bowl'
  | 'add-option'
  | 'thai-soup'
  | 'french-fry'
  | 'chicken-pakora'
  | 'drinks';

export interface FoodVariant {
  id: string;
  name: string;
  price: number;
}

export interface Food {
  id: number;
  name: string;
  category: FoodCategory;
  image: string;
  price?: number;
  variants?: FoodVariant[];
}