import { Product } from "./types";

export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Crisp Royal Gala Apples',
        price: 4.50,
        unit: 'kg',
        category: 'Fruits',
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?w=800&q=80',
        description: 'Waitaki Valley grown, sweet and crunchy. Perfect for lunchboxes.',
        badge: 'Seasonal',
        origin: 'Central Otago',
        nutrition: ['Vitamin C', 'Prebiotic Fibre', 'low GI'],
        featured: true
    },
    {
        id: '2',
        name: 'Fresh Garden Carrots',
        price: 2.80,
        unit: 'kg',
        category: 'Vegetables',
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80',
        description: 'Earthy and sweet, hand-pulled this morning.',
        badge: 'Daily Fresh',
        origin: 'Pukekohe',
        nutrition: ['Vitamin A', 'Biotin', 'Potassium']
    },
    {
        id: '3',
        name: 'The Family Feast Box',
        price: 45.00,
        unit: 'box',
        category: 'Bundles',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
        description: 'A curated selection of our best seasonal picks. Feeds 4 for a week.',
        badge: 'Best Value',
        featured: true
    },
    {
        id: '4',
        name: 'Organic Spinach',
        price: 3.50,
        unit: '250g bag',
        category: 'Vegetables',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=80',
        description: 'Tender baby leaves, triple-washed and ready for your salad.',
        nutrition: ['Iron', 'Vitamin K', 'Magnesium']
    },
    {
        id: '5',
        name: 'Sun-Ripened Tomatoes',
        price: 6.90,
        unit: 'kg',
        category: 'Fruits',
        image: 'https://images.unsplash.com/photo-1591130901021-3f56bc376fba?w=800&q=80',
        description: 'Vine-ripened for maximum flavour. Bursting with local sunshine.',
        badge: 'Staff Pick'
    },
    {
        id: '6',
        name: 'Paddy\'s Berry Mix',
        price: 12.50,
        unit: 'punnet',
        category: 'Fruits',
        image: 'https://images.unsplash.com/photo-1464960726330-672ce6689d0b?w=800&q=80',
        description: 'A vibrant mix of strawberries, blueberries, and raspberries.',
        badge: 'Weekly Special',
        featured: true
    }
];

export const CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Bundles', 'Seasonal', 'Offers'] as const;
