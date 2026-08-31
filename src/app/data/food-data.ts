import { Food } from '../models/food.model';

export const FOOD_ITEMS: Food[] = [

  // =========================
  // CLASSIC BURGER
  // =========================

  {
    id: 1,
    name: 'Classic Burger',
    category: 'classic-burger',
    image: '/foods/classic-burger.jpg',
    price: 100,
  },
  {
    id: 2,
    name: 'Classic Crispy',
    category: 'classic-burger',
    image: '/foods/classic-crispy.jpg',
    price: 100,
  },
  {
    id: 3,
    name: 'Classic Naga',
    category: 'classic-burger',
    image: '/foods/classic-naga.jpg',
    price: 120,
  },
  {
    id: 4,
    name: 'Classic Cheese',
    category: 'classic-burger',
    image: '/foods/classic-cheese.jpg',
    price: 130,
  },
  {
    id: 5,
    name: 'Classic BBQ With Cheese',
    category: 'classic-burger',
    image: '/foods/classic-bbq-cheese.jpg',
    price: 150,
  },
  {
    id: 6,
    name: 'Classic Sausage With Cheese',
    category: 'classic-burger',
    image: '/foods/classic-sausage-cheese.jpg',
    price: 150,
  },
  {
    id: 7,
    name: 'Classic Mushroom With Cheese',
    category: 'classic-burger',
    image: '/foods/classic-mushroom-cheese.jpg',
    price: 150,
  },


  // =========================
  // MINI BURGER
  // =========================

  {
    id: 8,
    name: 'Mini Burger',
    category: 'mini-burger',
    image: '/foods/mini-burger.jpg',
    price: 60,
  },
  {
    id: 9,
    name: 'Mini Crispy',
    category: 'mini-burger',
    image: '/foods/mini-crispy.jpg',
    price: 70,
  },
  {
    id: 10,
    name: 'Mini Naga',
    category: 'mini-burger',
    image: '/foods/mini-naga.jpg',
    price: 80,
  },
  {
    id: 11,
    name: 'Mini Cheese',
    category: 'mini-burger',
    image: '/foods/mini-cheese.jpg',
    price: 90,
  },
  {
    id: 12,
    name: 'Mini BBQ With Cheese',
    category: 'mini-burger',
    image: '/foods/mini-bbq-cheese.jpg',
    price: 100,
  },
  {
    id: 13,
    name: 'Mini Sausage With Cheese',
    category: 'mini-burger',
    image: '/foods/mini-sausage-cheese.jpg',
    price: 100,
  },
  {
    id: 14,
    name: 'Mini Mushroom With Cheese',
    category: 'mini-burger',
    image: '/foods/mini-mushroom-cheese.jpg',
    price: 100,
  },


  // =========================
  // PASTA
  // =========================

  {
    id: 15,
    name: 'Red Sauce Pasta',
    category: 'pasta',
    image: '/foods/red-sauce-pasta.jpg',
    price: 120,
  },
  {
    id: 16,
    name: 'BBQ Pasta',
    category: 'pasta',
    image: '/foods/bbq-pasta.jpg',
    price: 150,
  },
  {
    id: 17,
    name: 'Naga Pasta',
    category: 'pasta',
    image: '/foods/naga-pasta.jpg',
    price: 150,
  },
  {
    id: 18,
    name: 'Cheese Pasta',
    category: 'pasta',
    image: '/foods/cheese-pasta.jpg',
    price: 250,
  },


  // =========================
  // CHOWMEIN
  // =========================

  {
    id: 19,
    name: 'Regular Chowmein',
    category: 'chowmein',
    image: '/foods/regular-chowmein.jpg',
    variants: [
      {
        id: 'single',
        name: 'Single',
        price: 120,
      },
      {
        id: '1-3',
        name: '1:3',
        price: 300,
      },
    ],
  },
  {
    id: 20,
    name: 'Naga Chowmein',
    category: 'chowmein',
    image: '/foods/naga-chowmein.jpg',
    price: 150,
  },


  // =========================
  // MEAT BOX
  // =========================

  {
    id: 21,
    name: 'Regular Meatbox',
    category: 'meat-box',
    image: '/foods/regular-meatbox.jpg',
    price: 120,
  },
  {
    id: 22,
    name: 'Naga Meatbox',
    category: 'meat-box',
    image: '/foods/naga-meatbox.jpg',
    price: 150,
  },
  {
    id: 23,
    name: 'Special Meatbox',
    category: 'meat-box',
    image: '/foods/special-meatbox.jpg',
    price: 180,
  },


  // =========================
  // WINGS
  // =========================

  {
    id: 24,
    name: 'BBQ Wings',
    category: 'wings',
    image: '/foods/bbq-wings.jpg',
    price: 200,
  },
  {
    id: 25,
    name: 'Naga Wings',
    category: 'wings',
    image: '/foods/naga-wings.jpg',
    price: 200,
  },
  {
    id: 26,
    name: 'Red Sauce',
    category: 'wings',
    image: '/foods/red-sauce-wings.jpg',
    price: 180,
  },


  // =========================
  // RICE BOWL
  // =========================

  {
    id: 27,
    name: 'Manchurian Bowl',
    category: 'rice-bowl',
    image: '/foods/manchurian-bowl.jpg',
    price: 100,
  },
  {
    id: 28,
    name: 'BBQ Rice',
    category: 'rice-bowl',
    image: '/foods/bbq-rice.jpg',
    price: 120,
  },
  {
    id: 29,
    name: 'Crispy Rice',
    category: 'rice-bowl',
    image: '/foods/crispy-rice.jpg',
    price: 120,
  },


  // =========================
  // ADD OPTION
  // =========================

  {
    id: 30,
    name: 'Mayonnaise',
    category: 'add-option',
    image: '/foods/mayonnaise.jpg',
    price: 15,
  },
  {
    id: 31,
    name: 'Naga Sauce',
    category: 'add-option',
    image: '/foods/naga-sauce.jpg',
    price: 30,
  },


  // =========================
  // THAI SOUP
  // =========================

  {
    id: 32,
    name: 'Thai Soup',
    category: 'thai-soup',
    image: '/foods/thai-soup.jpg',
    variants: [
      {
        id: '1-1',
        name: '1:1',
        price: 120,
      },
      {
        id: '1-3',
        name: '1:3',
        price: 300,
      },
    ],
  },


  // =========================
  // FRENCH FRY
  // =========================

  {
    id: 33,
    name: 'French Fry',
    category: 'french-fry',
    image: '/foods/french-fry.jpg',
    price: 100,
  },


  // =========================
  // CHICKEN PAKORA
  // =========================

  {
    id: 34,
    name: 'Chicken Pakora',
    category: 'chicken-pakora',
    image: '/foods/chicken-pakora.jpg',
    price: 120,
  },


  // =========================
  // DRINKS ITEM
  // =========================

  {
    id: 35,
    name: 'Sweet Lassi',
    category: 'drinks',
    image: '/foods/sweet-lassi.jpg',
    price: 80,
  },
  {
    id: 36,
    name: 'Chocolate Cold Coffee',
    category: 'drinks',
    image: '/foods/chocolate-cold-coffee.jpg',
    price: 100,
  },
  {
    id: 37,
    name: 'Chocolate Shake',
    category: 'drinks',
    image: '/foods/chocolate-shake.jpg',
    price: 120,
  },
  {
    id: 38,
    name: 'Strawberry Shake',
    category: 'drinks',
    image: '/foods/strawberry-shake.jpg',
    price: 120,
  },
  {
    id: 39,
    name: 'Oreo Shake',
    category: 'drinks',
    image: '/foods/oreo-shake.jpg',
    price: 120,
  },
  {
    id: 40,
    name: 'Lemon Juice',
    category: 'drinks',
    image: '/foods/lemon-juice.jpg',
    price: 30,
  },
  {
    id: 41,
    name: 'Soft Drinks',
    category: 'drinks',
    image: '/foods/soft-drinks.jpg',
    price: 30,
  },


  // =========================
  // PIZZA
  // =========================

  {
    id: 42,
    name: 'Chicken Pizza',
    category: 'pizza',
    image: '/foods/chicken-pizza.jpg',
    variants: [
      {
        id: '7-inch',
        name: '7"',
        price: 240,
      },
      {
        id: '9-inch',
        name: '9"',
        price: 320,
      },
      {
        id: '12-inch',
        name: '12"',
        price: 450,
      },
    ],
  },
  {
    id: 43,
    name: 'Chicken Onion Pizza',
    category: 'pizza',
    image: '/foods/chicken-onion-pizza.jpg',
    variants: [
      {
        id: '7-inch',
        name: '7"',
        price: 280,
      },
      {
        id: '9-inch',
        name: '9"',
        price: 360,
      },
      {
        id: '12-inch',
        name: '12"',
        price: 460,
      },
    ],
  },
  {
    id: 44,
    name: 'Cheese Blast Pizza',
    category: 'pizza',
    image: '/foods/cheese-blast-pizza.jpg',
    variants: [
      {
        id: '7-inch',
        name: '7"',
        price: 380,
      },
      {
        id: '9-inch',
        name: '9"',
        price: 480,
      },
      {
        id: '12-inch',
        name: '12"',
        price: 580,
      },
    ],
  },
  {
    id: 45,
    name: 'Italian Pizza',
    category: 'pizza',
    image: '/foods/italian-pizza.jpg',
    variants: [
      {
        id: '7-inch',
        name: '7"',
        price: 350,
      },
      {
        id: '9-inch',
        name: '9"',
        price: 450,
      },
      {
        id: '12-inch',
        name: '12"',
        price: 550,
      },
    ],
  },
  {
    id: 46,
    name: 'Chicken Lover Pizza',
    category: 'pizza',
    image: '/foods/chicken-lover-pizza.jpg',
    variants: [
      {
        id: '7-inch',
        name: '7"',
        price: 400,
      },
      {
        id: '9-inch',
        name: '9"',
        price: 500,
      },
      {
        id: '12-inch',
        name: '12"',
        price: 600,
      },
    ],
  },
  {
    id: 47,
    name: 'Sausage Overload Pizza',
    category: 'pizza',
    image: '/foods/sausage-overload-pizza.jpg',
    variants: [
      {
        id: '7-inch',
        name: '7"',
        price: 350,
      },
      {
        id: '9-inch',
        name: '9"',
        price: 420,
      },
      {
        id: '12-inch',
        name: '12"',
        price: 520,
      },
    ],
  },
  {
    id: 48,
    name: 'BBQ Pizza',
    category: 'pizza',
    image: '/foods/bbq-pizza.jpg',
    variants: [
      {
        id: '7-inch',
        name: '7"',
        price: 350,
      },
      {
        id: '9-inch',
        name: '9"',
        price: 450,
      },
      {
        id: '12-inch',
        name: '12"',
        price: 550,
      },
    ],
  },
  {
    id: 49,
    name: 'Naga Pizza',
    category: 'pizza',
    image: '/foods/naga-pizza.jpg',
    variants: [
      {
        id: '7-inch',
        name: '7"',
        price: 320,
      },
      {
        id: '9-inch',
        name: '9"',
        price: 420,
      },
      {
        id: '12-inch',
        name: '12"',
        price: 520,
      },
    ],
  },
  {
    id: 50,
    name: 'Tokyo Special Pizza',
    category: 'pizza',
    image: '/foods/tokyo-special-pizza.jpg',
    variants: [
      {
        id: '7-inch',
        name: '7"',
        price: 400,
      },
      {
        id: '9-inch',
        name: '9"',
        price: 600,
      },
      {
        id: '12-inch',
        name: '12"',
        price: 800,
      },
    ],
  },
];

